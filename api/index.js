import express from 'express'
import axios from 'axios'
const app = express()
const port = 10000

// cuántos items mostrar como resultado de la búsqueda
const maxItems = 4

const author = {
  name: 'Martin',
  lastname: 'Zenzerovich'
}

app.get('/health', (req, res) => {
  res.json({status: 'healthy'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/api/items', async (req, res) => {
  const query = req.query.q
  const meliSearchEndpoint = `https://api.mercadolibre.com/sites/MLA/search?q=${query}`

  try {
    const doc = await axios.get(meliSearchEndpoint)

    const filteredResults = doc.data.results.slice(0, maxItems)

    const categoriesObj = doc.data.available_filters.find(filter => filter.id === 'category')
    console.debug(categoriesObj)
    let categories = []
    if (categoriesObj) {
      categories = categoriesObj.values.sort((a, b) => b.results - a.results).map(value => value.name)
    }
    const items = filteredResults.map(item => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: Math.floor(item.price),
        decimals: Number((item.price % 1).toFixed(2)) * 100,
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
    }))

    const transformedData = {
      author,
      categories,
      items,
    }

    // console.debug(transformedData)
    res.json(transformedData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
})

app.get('/api/items/:id', async (req, res) => {
  const itemId = req.params.id
  const meliItemEndpoint = `https://api.mercadolibre.com/items/${itemId}`
  const meliItemDescriptionEndpoint = `https://api.mercadolibre.com/items/${itemId}/description`

  try {
    const doc = await axios.get(meliItemEndpoint)
    const description = await axios.get(meliItemDescriptionEndpoint)
    const data = doc.data

    const item = {
      id: data.id,
      title: data.title,
      price: {
        currency: data.currency_id,
        amount: Math.floor(data.price),
        decimals: Number((data.price % 1).toFixed(2)) * 100, // Assuming 2 decimal places
      },
      picture: data.thumbnail,
      condition: data.condition,
      free_shipping: data.shipping.free_shipping,
      initial_quantity: data.initial_quantity,
      description: description.data.plain_text
    }

    const transformedData = {
      author,
      item,
    }

    console.log(transformedData)
    res.json(transformedData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
})

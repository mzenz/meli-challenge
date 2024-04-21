import axios from 'axios'

const apiDomain = 'http://localhost:10000'
const searchItemsEndpoint = `${apiDomain}/api/items`

export async function searchItems(searchString) {
  const searchApiURL = `${searchItemsEndpoint}?q=${encodeURIComponent(searchString)}`
  try {
    const res = await axios.get(searchApiURL)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export async function searchItemInfo(itemId) {
  const itemInfoApiURL = `${searchItemsEndpoint}/${itemId}`
  console.debug('item info url:', itemInfoApiURL)
  try {
    const res = await axios.get(itemInfoApiURL)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

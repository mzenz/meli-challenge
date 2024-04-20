import express from 'express'
const app = express()
const port = 10000

app.get('/health', (req, res) => {
  res.send('healthy')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

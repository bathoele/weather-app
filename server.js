import express from 'express'
import path from 'path'

const app = express()

app.get('/search', (req, res) => {
  res.json()
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
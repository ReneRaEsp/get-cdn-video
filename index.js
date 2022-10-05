const express = require('express')
const { startCors } = require('./middlewares/cors.middleware.js')
const scrapeHat = require('./controllers/hat.controller')
const scrapeTabooDaddy = require('./controllers/taboo.controller')

const app = express()

//Middlewares
startCors(app)

//Routes
const render = (req, res) => {
  res.json({
    message: 'Welcome to my api',
  })
}

app.get('/', render)

app.get('/hat', scrapeHat)

app.get('/taboo', scrapeTabooDaddy)

app.listen(3000, () => {
  console.log('app listening')
})

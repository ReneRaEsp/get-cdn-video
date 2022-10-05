const express = require('express')
const axios = require('axios')
const request = require('request')
const { startCors } = require('./middlewares/cors.middleware.js')

const app = express()

//Middlewares
startCors(app)

//Controllers - Routes
const scrapeHat = async (req, res) => {
  let url = req.query.url
  console.log(url)
  let posibleLink
  try {
    await axios.get(url).then((response) => {
      posibleLink = response.data
      console.log(posibleLink)
      let positionInit = posibleLink.search('download-link')
      posibleLink = posibleLink.substring(positionInit)
      positionInit = posibleLink.search('http')
      posibleLink = posibleLink.substring(positionInit)
      let positionFinal = posibleLink.search('"')
      posibleLink = posibleLink.substring(0, positionFinal)
    })
    request(
      { url: posibleLink, followRedirect: false },
      (err, response, body) => {
        posibleLink = response.headers.location
        res.status(200).json({
          video_url: posibleLink,
        })
      },
    )
  } catch (err) {
    res.status(500).json({
      msg: err,
    })
  }
}

const render = (req, res) => {
  res.json({
    message: 'Welcome to my api',
  })
}

app.get('/', render)

app.get('/hat', scrapeHat)

app.listen(3000, () => {
  console.log('app listening')
})

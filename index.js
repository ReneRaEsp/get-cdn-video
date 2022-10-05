const express = require('express')
const axios = require('axios')
const request = require('request')

const app = express()

const scrapeHat = async (req, res) => {
  let url = req.query.url
  let posibleLink
  await axios
    .get(url)
    .then((response) => {
      posibleLink = response.data
      let positionInit = posibleLink.search('download-link')
      posibleLink = posibleLink.substring(positionInit)
      positionInit = posibleLink.search('http')
      posibleLink = posibleLink.substring(positionInit)
      let positionFinal = posibleLink.search('"')
      posibleLink = posibleLink.substring(0, positionFinal)
    })
    .catch((err) => {
      res.json(err)
    })

  request({ url: posibleLink, followRedirect: false }, (err, response, body) => {
    if (!err) {
      posibleLink = response.headers.location
      res.status(200).json({
        video_url: posibleLink,
      })
    } else {
      res.status(404).json({
        video_url: 'not found',
      })
    }
  })
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

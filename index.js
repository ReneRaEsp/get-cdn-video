const express = require('express')
const axios = require('axios')

const app = express()

const scrapeHat = (req, res) => {
  let url = req.query.url
  axios
    .get(url)
    .then((response) => {
      let posibleLink = response.data
      let positionInit = posibleLink.search('https://www.pornhat.com/embed')
      posibleLink = posibleLink.substring(positionInit)
      let positionFinal = posibleLink.search('"')
      posibleLink = posibleLink.substring(0, positionFinal)
      res.status(200).json({
        video_url: posibleLink,
      })
    })
    .catch((err) => {
      res.json(err)
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

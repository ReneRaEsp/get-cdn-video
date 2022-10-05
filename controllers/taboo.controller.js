const axios = require('axios')

const scrapeTabooDaddy = async (req, res) => {
  let url = req.query.url
  let posibleLink
  try {
    await axios.get(url).then((response) => {
      posibleLink = response.data
      let positionInit = posibleLink.search('contentURL')
      posibleLink = posibleLink.substring(positionInit)
      positionInit = posibleLink.search('http')
      posibleLink = posibleLink.substring(positionInit)
      let positionFinal = posibleLink.search('"')
      posibleLink = posibleLink.substring(0, positionFinal)
    })
    res.status(200).json({
      video_url: posibleLink,
    })
  } catch (e) {
    res.status(500).json({
      msg: 'Server error',
      e,
    })
  }
}

module.exports = scrapeTabooDaddy

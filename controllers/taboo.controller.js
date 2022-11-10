const axios = require('axios')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

const scrapeTabooDaddy = async (req, res) => {
  const url = req.query.url
  let posibleLink
  try {
    await axios.get(url).then((response) => {
      posibleLink = response.data
      const dom = new JSDOM(posibleLink, {
        runScripts: 'dangerously',
        resources: 'usable'
      })
      const { document } = dom.window
      posibleLink = document.getElementsByTagName('source')[0].src
    })
    res.status(200).json({
      video_url: posibleLink
    })
  } catch (e) {
    res.status(500).json({
      msg: 'Server error',
      e,
    })
  }
}

module.exports = scrapeTabooDaddy

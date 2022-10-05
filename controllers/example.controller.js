const scrapeExample = (req, res) => {
  try {
    res.status(200).json({
      msg: 'Success',
    })
  } catch (e) {
    res.status(500).json({
      msg: 'Server error',
      e,
    })
  }
}

module.exports = scrapeExample

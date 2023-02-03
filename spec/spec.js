const mongoose = require("mongoose");

const specTest = (req,res,next) => {
  res.status(200).json({
    username: req.query.username
  })
}

module.exports = {
  specTest
}
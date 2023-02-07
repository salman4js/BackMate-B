const mongoose = require("mongoose");

const specTest = (req,res,next) => {
  res.status(200).json({
    username: req.query.username,
    password: req.query.password
  })
}

module.exports = {
  specTest
}
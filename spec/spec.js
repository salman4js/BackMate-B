const mongoose = require("mongoose");

const specTest = (req,res,next) => {
  res.status(200).json({
    username: req.query.username,
    password: req.query.password
  })
}

const specTest2 = (req, res, next) => {
  
  const data = [
    {
      "date" : "string",
      "links": [
        {
          "url" : "url",
          "method" : "method"
        }
      ]
    }
  ]
  
  res.status(200).json({
    success: true,
    message: data
  })
}

module.exports = {
  specTest, specTest2
}
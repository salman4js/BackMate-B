const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username : String,
  email : String,
  password : String,
  link: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Links"
  }],
  reports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reports"
  }]
});

module.exports = mongoose.model("Users", userSchema);
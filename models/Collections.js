const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  link: String,
  method: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  }
})

module.exports = mongoose.model("Links", collectionSchema);
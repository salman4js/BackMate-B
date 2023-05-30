const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  storyName: String,
  apiName: String,
  authorName: String,
  scenarioName: String,
  actualResult: Array,
  expectedResult: Array,
  success: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  }
})

module.exports = mongoose.model("Reports", reportSchema);
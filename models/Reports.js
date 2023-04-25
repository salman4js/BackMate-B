const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  storyName: String,
  scenarioName: String,
  actualResult: String,
  expectedResult: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  }
})

module.exports = mongoose.model("Reports", reportSchema);
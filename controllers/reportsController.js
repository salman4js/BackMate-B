const User = require("../models/Users.js");
const Reports = require("../models/Reports.js");


// Add report to the particular user -- TODO: Later change this to particular team!
async function addReport(req,res,next){
  try{
    const report = new Reports({
      storyName: req.body.storyName,
      apiName: req.body.apiName,
      authorName: req.body.authorName,
      scenarioName: req.body.scenarioName,
      actualResult: req.body.actualResult,
      expectedResult: req.body.expectedResult,
      success: req.body.isSuccess,
      user: req.body.userId 
    })
    
    // if report instance created successfully!
    if(report){
      await User.findByIdAndUpdate({_id: report.user}, {$push: {reports: report._id}})
    }
    
    await report.save();
    res.status(200).json({
      success: true,
      message: "Report generated and saved for the test case!"
    })
  } catch(err){
    res.status(404).json({
      success: false,
      message: "Some internal error occured!"
    })
  }
}

// Get all the report for the particular user!
async function getReport(req,res,next){
  try{
    const reports = await Reports.find({user: req.body.userId});
    res.status(200).json({
      success: true,
      message: reports
    })
  } catch(err){
    res.status(404).json({
      success: false,
      message: "Some internal error occured!"
    })
  }
}

// Delete specific report of the user!
async function deleteReport(req,res,next){
  // Delete the reference of the report in the user schema!
  await User.findByIdAndUpdate({_id: req.body.userId}, {$pull : {reports : req.body.reportId}})
  
  // Delete the actual report entry!
  Reports.findByIdAndDelete(req.body.reportId)
    .then(data => {
      res.status(200).json({
        success: true,
        message: "Report has been deleted successfully!"
      })
    })
    .catch(err => {
      res.status(404).json({
        success: false,
        message: "Some internal error occured!"
      })
    })
}

// Delete all the reports for the specific user!
async function deleteAllReport(req, res, next){

  // Delete the reports reference in the user schema!
  await User.findByIdAndUpdate({_id: req.body.userId}, {$set : { reports: [] } }, {new : true})
  
  Reports.deleteMany({user: req.body.userId})
    .then(data => {
      res.status(200).json({
        success: true,
        message: "All the reports have been deleted!"
      })
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "Internal Error Occured!"
      })
    })
}


// Modify this code later, when we get to server side automation and progress panel development!
// Check for the equal values in the automated result!
function checkEqual(req,res,next){
  const data = {
    response: req.body.response,
    expected: req.body.expected
  }
  
  var failedTests = [];

  for (let i = 0; i < data.response.length; i++) {
    for(let j = 0; j < data.response[i].length; j++){
      if (!data.expected.includes(data.response[i][j])) {
        failedTests.push(data.response[i])
      }
    }
  }

  res.status(200).json({
    success: true,
    message: failedTests
  })
  
}


module.exports = {
  addReport, getReport, deleteReport, deleteAllReport, checkEqual
}
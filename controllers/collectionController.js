const User = require("../models/Users.js");
const Links = require("../models/Collections.js");
const brewDate = require('brew-date');
const commonFunctions = require('../commonImplementations/common.functions');

// Add collections to the user schema!
async function addCollections(req,res,next){
  
  // Convert request body which is coming as a object to string!
  const requestBody = JSON.stringify(req.body.body)
    
  try{
     const link = new Links({
       link: req.body.url,
       method: req.body.mode,
       reqBody: requestBody,
       date: req.body.date,
       user: req.body.userId
     })
     
     if(link){
       await User.findByIdAndUpdate({_id: link.user}, {$push: {link: link._id}})
     }
     
     await link.save();
     res.status(200).json({
       success: true,
       message: "Collection added to the user!"
     })
     
  } catch(err){
    res.status(200).json({
      success: false,
      message: "Internal error occured!"
    })
  }
}

// Get All collection of the specific user schema!
async function getCollections(req,res,next){
  try{
    const links = await Links.find({user: req.body.userId});
    const structedData = structureData(links);
    res.status(200).json({
      success: true,
      message: structedData
    })
  } catch(err){
    res.status(500).json({
      success: false,
      message: "Internal error occured."
    })
  }
}

// Customize the getCollection result in order to have properly structured data!
function structureData(results){
  // Grouping the values by date
  const groupedData = {};
  for (const item of results) {
    const { date, link, method, reqBody } = item;
    if (!groupedData[date]) {
      groupedData[date] = { date, links: [] };
    }
    groupedData[date].links.push({ url: link, method, reqBody });
  }
  // Converting the grouped data object to an array of values
  const groupedDataArray = Object.values(groupedData);
  return groupedDataArray
}

// Delete collection to the user schema!
async function deleteCollection(req,res,next){
  // Delete the reference of the collection in the user schema!
  await User.findByIdAndDelete({_id: req.body.userId}, {$pull: {link: req.body.collectionId}});
  
  // Delete the collection entry!
  Links.findByIdAndDelete(req.body.collectionId)
    .then(data => {
      res.status(200).json({
        success: true,
        message: "Collection has been deleted successfully!"
      })
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "Some internal error occured!"
      })
    })
}

async function deleteAllCollection(req,res,next){

  // Delete the reference of the collection in the user schema!
  const updatedUser = await User.findByIdAndUpdate({_id: req.body.userId}, { $set: { link: [] } }, { new: true })

  Links.deleteMany({user: req.body.userId})
    .then(data => {
      res.status(200).json({
        success: true,
        message: "Collections has been deleted!"
      })
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "Internal error occured."
      })
    })
  
}


module.exports = {
  addCollections, getCollections, deleteCollection, deleteAllCollection
}
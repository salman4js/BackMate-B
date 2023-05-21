const User = require("../models/Users.js");
const Links = require("../models/Collections.js");

// Add collections to the user schema!
async function addCollections(req,res,next){
  try{
     const link = new Links({
       link: req.body.link,
       method: req.body.method,
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
    res.status(200).json({
      success: true,
      message: links
    })
  } catch(err){
    res.status(404).json({
      success: false,
      message: "Internal error occured."
    })
  }
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
      res.status(404).json({
        success: false,
        message: "Some internal error occured!"
      })
    })
}


module.exports = {
  addCollections, getCollections, deleteCollection
}
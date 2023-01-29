const User = require("../models/Users.js");
const jwt  = require("jsonwebtoken");

const createUser = async(req,res,next) => {
  try{
    const user = new User({
      username: req.body.username,
      email : req.body.email,
      password: req.body.password
    })
    await user.save();
    res.status(200).json({
      status: 201,
      success : true,
      message : "User added"
    })
  } catch(err){
    res.status(200).json({
      status: 500,
      success: false,
      message : "Some internal error occured"
    })
  }
}

const loginUser = (req,res,next) => {
  try{
    password = req.body.password,
    email =  req.body.email
    User.findOne({email: email})
      .then(data => {
        if(data){
          if(data.password !== password){
            res.status(200).json({
              success: false,
              message : "Please check the credentials"
            })
          } else {
            let token = jwt.sign({id : data._id}, "secretValue", {expiresIn: '5h'});
            res.status(200).json({
              success: true,
              message : "User logged in",
              username : data.username,
              userid: data._id,
              token
            })
          }
        } else {
          res.status(200).json({
            success: false,
            message: "User not found"
          })
        }
      })
  } catch(err){
    res.status(200).json({
      success : false,
      message : "Some internal error occured!"
    })
  }
}

const allUsers = async (req,res,next) => {
  const users = await User.find({});
  res.status(200).json({
    success : true,
    message : users
  })
}

const deleteUser = (req,res,next) => {
  try{
    User.findByIdAndDelete({_id: req.params.id})
      .then(data => {
        res.status(200).json({
          success: true,
          message: "User deleted!"
        })
      })
  } catch(err){
    res.status(200).json({
      success: false,
      message : "Some internal error occured!"
    })
  }
}

module.exports = {
  createUser, allUsers, loginUser, deleteUser
}
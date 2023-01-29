const express = require("express");
const router = express.Router();

// Importing required controllers
const userController = require("../controllers/authController.js");

// Autentication Routes!
router.get("/allusers", userController.allUsers);
router.post("/createuser", userController.createUser);
router.post("/loginuser", userController.loginUser);
router.delete("/:id/deleteuser", userController.deleteUser)

module.exports = router;

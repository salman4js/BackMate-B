const express = require("express");
const router = express.Router();

// Importing required controllers
const userController = require("../controllers/authController.js");
const reportController = require("../controllers/reportsController.js");
const specController = require("../spec/spec.js");

// Autentication Routes!
router.get("/allusers", userController.allUsers);
router.post("/createuser", userController.createUser);
router.post("/loginuser", userController.loginUser);
router.delete("/:id/deleteuser", userController.deleteUser);

// Reports Routes!
router.post('/allreports', reportController.getReport);
router.post('/addreport', reportController.addReport);

// Testing routes -- Delete later!
router.get("/alluserstest/", userController.isAuth, specController.specTest);

module.exports = router;

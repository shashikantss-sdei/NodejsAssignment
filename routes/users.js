const express = require("express");

const router = express.Router();
const userController = require("../controller/userController");
/// if you want to access the data from token then you have to paste that on router.get
const verifyTokenAndAuthorization = require("../routes/verifytoken"); 
const verifyToken = require("../routes/verifytoken");


//register
router.post("/signup", userController.signUp);
// login
router.post("/login", userController.login);

// getallUser 
router.get("/getAllUser", 
     userController.getAllUser
);

module.exports = router;
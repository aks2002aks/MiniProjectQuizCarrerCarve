const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { isLoggedIn } = require("../controllers/authController");

router.post("/signup", userController.signup);
router.put("/edit/phonenumber", isLoggedIn, userController.editPhoneNumber);

module.exports = router;

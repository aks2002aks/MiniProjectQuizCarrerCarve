const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");
const { isLoggedIn } = require("../controllers/authController");

router.post("/submit-test", isLoggedIn, testController.submitTest);
router.post("/add-test", testController.addTest);

module.exports = router;

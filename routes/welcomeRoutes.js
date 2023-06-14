const express = require("express");
const router = express.Router();
const userController = require("../controllers/welcomeController");


router.post("/welcome", userController.welcome);
router.get("/welcome", userController.welcome);


module.exports = router;

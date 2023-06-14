const express = require("express");
const router = express.Router();
const userController = require("../controllers/welcomeController");


router.post("/", userController.welcome);
router.get("/", userController.welcome);


module.exports = router;

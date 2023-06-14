// controllers/welcomeController.js

const welcome = (req, res) => {
    res.status(200).json({
      success: true,
      message: "API successfully called",
    });
  };
  
  module.exports = {
    welcome,
  };
  
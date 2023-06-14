// controllers/userController.js

const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { name, email, password, phone_number } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone_number,
    });

    res.json({
      success: true,
      message: "Signed up successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to sign up",
    });
  }
};

const editPhoneNumber = async (req, res, next) => {
  const { phone_number } = req.body;
  try {
    const user = res.locals.user;
    const userId = user.userId;

    const newUser = await User.findByIdAndUpdate(
      userId,
      { phone_number },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Phone number changed/added successfully",
      user: newUser, // Optionally, you can include the updated user object in the response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal error occurred",
    });
  }
};

module.exports = {
  editPhoneNumber,
  signup,
};

// controllers/authController.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const authToken = jwt.sign(
        { userId: user._id, name: user.name, email: user.email },
        process.env.JWT_TOKEN,
        {
          expiresIn: "1day",
        }
      );
      res.cookie("jwt", authToken);
      res.json({
        success: true,
        message: "Login successful",
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

const isLoggedIn = async (req, res, next) => {
  try {
    // // Now you have the Bearer token extracted from the cookie
    // const cookie = document.cookie;
    // const token = cookie
    //   .split(";")
    //   .map((cookie) => cookie.trim())
    //   .find((cookie) => cookie.startsWith("jwt="))
    //   .split("=")[1];

    // bearerToken
    const Bearertoken = req.headers.authorization;
    const token = Bearertoken.split(" ")[1];
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);

      if (decodedToken) {
        res.locals.user = decodedToken;
        return next();
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  isLoggedIn,
  login,
};

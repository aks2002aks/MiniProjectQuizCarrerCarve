// models/user.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: [true, "name must be provided"]
  },
  email: {
    type: "string",
    required: [true, "email must be provided"],
    unique: [true, "email must be unique"]
  },
  password: {
    type: "string",
    required: [true, "password must be provided"]
  },
  phone_number: {
    type: "string",
    required: [true, "phone_number must be provided"]
  },
});

module.exports = mongoose.model("User", userSchema);

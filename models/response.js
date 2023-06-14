const User = require("./user");
const Test = require("./test");
const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
  },
  answers: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
      },
      selectedAnswer: [String],
    },
  ],
  score: Number,
});

module.exports = mongoose.model("Response", responseSchema);

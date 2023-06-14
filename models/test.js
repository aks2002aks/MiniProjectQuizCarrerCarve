const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  questions: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: function() {
        return new mongoose.Types.ObjectId();
      },
    },
    questionText: String,
    options: [String],
    correctAnswers: [String]
  }],
});

module.exports = mongoose.model("Test", testSchema);

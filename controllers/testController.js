const Test = require("../models/test");
const Response = require("../models/response");

const submitTest = async (req, res) => {
  const { userId, testId, answers } = req.body;

  try {
    const existingResponse = await Response.findOne({
      user: userId,
      test: testId,
    });

    if (existingResponse) {
      return res.status(400).json({
        success: false,
        message: "You have already taken this test",
      });
    }

    const test = await Test.findById(testId);

    let score = 0;
    for (const answer of answers) {
      const question = test.questions.find(
        (q) => q._id.toString() === answer.questionId
      );

      console.log(question);

      if (question) {
        const correctAnswers = question.correctAnswers;
        const selectedAnswers = answer.selectedAnswers;

        if (arraysEqual(correctAnswers, selectedAnswers)) {
          score++;
        }
      }
    }

    // const response = await Response.create({
    //   user: userId,
    //   test: testId,
    //   answers: answers.map((answer) => ({
    //     question: answer.questionId,
    //     selectedAnswers: answer.selectedAnswers,
    //   })),
    //   score,
    // });

    res.json({
      userId,
      testId,
      score,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit test",
    });
  }
};

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    const ans = arr1[i].toLowerCase();
    const sans = arr2[i].toLowerCase();
    if (ans !== sans) return false;
  }
  return true;
}

const addTest = async (req, res) => {
  const { questions } = req.body;
  try {
    const test = new Test();
    for (const question of questions) {
      test.questions.push(question);
    }

    try {
      const savedTest = await test.save();
      res.status(200).json({
        success: true,
        message: "Added Test Succesfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to Add Test",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Add Test",
    });
  }
};

module.exports = {
  addTest,
  submitTest,
};

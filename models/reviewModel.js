const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    employeeName: { type: String, required: true },
    employeeID: { type: String, required: true },
    employeeEmail: { type: String, required: false },
    employeePhone: { type: String, required: false },
    evaluationPeriod: { type: String, required: true },
    productivity: { type: Number, required: true },
    teamwork: { type: Number, required: true },
    punctuality: { type: Number, required: true },
    communication: { type: Number, required: true },
    problemSolving: { type: Number, required: true },
    feedback: [
      {
        review: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;

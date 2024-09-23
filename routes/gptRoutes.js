const express = require("express");
const {
  generateFeedback,
  generateComparisonFeedback,
} = require("../controllers/gptController");

const router = express.Router();

// GPT Feedback Route
router.post("/generate-feedback", generateFeedback);
router.post("/generate-comparison-feedback", generateComparisonFeedback);

module.exports = router;

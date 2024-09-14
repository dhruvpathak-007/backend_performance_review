const express = require("express");
const { generateFeedback } = require("../controllers/gptController");

const router = express.Router();

// GPT Feedback Route
router.post("/generate-feedback", generateFeedback);

module.exports = router;

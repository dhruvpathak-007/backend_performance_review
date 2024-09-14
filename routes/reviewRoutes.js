const express = require("express");
const {
  getReviews,
  createReview,
  deleteReview,
  updateReview,
  getReviewsByEmployeeID,
} = require("../controllers/reviewController");

const router = express.Router();

router.get("/", getReviews);
router.get("/employee/:employeeID", getReviewsByEmployeeID);
router.post("/", createReview);
router.delete("/:id", deleteReview); // Delete a review by ID
router.put("/:id", updateReview); // Update a review by ID

module.exports = router;

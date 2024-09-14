const Review = require("../models/reviewModel");

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve reviews" });
  }
};

const createReview = async (req, res) => {
  const {
    employeeName,
    employeeID,
    employeeEmail,
    employeePhone,
    evaluationPeriod,
    productivity,
    teamwork,
    punctuality,
    communication,
    problemSolving,
  } = req.body;

  try {
    const newReview = new Review({
      employeeName,
      employeeID,
      employeeEmail,
      employeePhone,
      evaluationPeriod,
      productivity,
      teamwork,
      punctuality,
      communication,
      problemSolving,
    });
    console.log("I m hited");
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: "Failed to create review" });
  }
};

const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete review" });
  }
};

const updateReview = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: "Failed to update review" });
  }
};

const getReviewsByEmployeeID = async (req, res) => {
  const { employeeID } = req.params;

  try {
    const reviews = await Review.find({ employeeID });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve reviews" });
  }
};

module.exports = {
  getReviews,
  createReview,
  deleteReview,
  updateReview,
  getReviewsByEmployeeID,
};

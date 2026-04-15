const express = require("express");
const router = express.Router({ mergeParams: true });

const reviewController = require("../controllers/reviewController");

const { isLoggedIn } = require("../middleware/auth");

router.post("/:id/reviews", isLoggedIn, reviewController.createReview);

router.delete(
  "/:id/reviews/:reviewId",
  isLoggedIn,
  reviewController.deleteReview,
);

module.exports = router;

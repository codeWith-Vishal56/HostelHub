const Review = require("../models/Review");

module.exports.createReview = async (req, res) => {
  const { id } = req.params;

  const review = new Review(req.body);

  review.author = req.user._id;

  review.hostel = id;

  await review.save();

  req.flash("success", "Review added");

  res.redirect(`/hostels/${id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { reviewId, id } = req.params;

  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review deleted");

  res.redirect(`/hostels/${id}`);
};

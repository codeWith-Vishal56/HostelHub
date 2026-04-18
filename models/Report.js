const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hostel",
  },

  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  reason: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Report", reportSchema);

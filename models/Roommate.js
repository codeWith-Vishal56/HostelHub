const mongoose = require("mongoose");

const roommateSchema = new mongoose.Schema({
  city: String,

  budget: Number,

  genderPreference: String,

  lifestyle: String,

  description: String,

  contactInfo: String,

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Roommate", roommateSchema);

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
  sleepSchedule: {
    type: String,
    enum: ["early bird", "night owl"],
  },

  smokingHabit: {
    type: String,
    enum: ["smoker", "non-smoker"],
  },

  drinkingHabit: {
    type: String,
    enum: ["yes", "no"],
  },

  studyStyle: {
    type: String,
    enum: ["quiet", "music"],
  },

  cleanlinessLevel: {
    type: String,
    enum: ["low", "medium", "high"],
  },
});

module.exports = mongoose.model("Roommate", roommateSchema);

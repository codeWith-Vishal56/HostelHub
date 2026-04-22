const mongoose = require("mongoose");

const friendProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  city: String,

  interests: [String], // array

  bio: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FriendProfile", friendProfileSchema);

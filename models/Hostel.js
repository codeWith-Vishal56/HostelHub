const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,

  roomType: {
    type: String,
    enum: ["single", "double", "triple"],
  },

  images: [
    {
      url: String,
      filename: String,
    },
  ],

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  // ✅ NEW FIELDS
  isVerified: {
    type: Boolean,
    default: false,
  },

  verificationStatus: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    default: "pending",
  },

  phone: String,
  email: String,

  isSuspicious: {
    type: Boolean,
    default: false,
  },

  reportsCount: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Hostel", hostelSchema);

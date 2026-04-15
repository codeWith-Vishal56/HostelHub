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

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Hostel", hostelSchema);

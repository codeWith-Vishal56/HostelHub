const express = require("express");
const router = express.Router();

const Hostel = require("../models/Hostel");
const Roommate = require("../models/Roommate");

// 🔹 Map page
router.get("/map", async (req, res) => {
  try {
    const hostels = await Hostel.find({});
    const roommates = await Roommate.find({});

    res.render("map/index", { hostels, roommates });
  } catch (err) {
    console.log(err);
    req.flash("error", "Unable to load map");
    res.redirect("/");
  }
});

module.exports = router;
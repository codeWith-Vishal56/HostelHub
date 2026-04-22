const Hostel = require("../models/Hostel");

module.exports.showMap = async (req, res) => {
  const hostels = await Hostel.find({});

  res.render("map/index", { hostels });
};

const Hostel = require("../models/Hostel");
const Roommate = require("../models/Roommate");

module.exports.ownerDashboard = async (req, res) => {
  const hostels = await Hostel.find({
    owner: req.user._id,
  });

  res.render("dashboard/owner", { hostels });
};

module.exports.tenantDashboard = async (req, res) => {
  const roommates = await Roommate.find({
    createdBy: req.user._id,
  });

  res.render("dashboard/tenant", { roommates });
};

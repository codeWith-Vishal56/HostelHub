const Report = require("../models/Report");
const Hostel = require("../models/Hostel");
const detectScam = require("../utils/detectScam");

module.exports.createReport = async (req, res) => {
  const { id } = req.params;

  const report = new Report({
    listingId: id,
    reportedBy: req.user._id,
    reason: req.body.reason,
  });

  await report.save();

  // increase report count
  const hostel = await Hostel.findById(id);
  hostel.reportsCount += 1;

  // re-check scam
  hostel.isSuspicious = detectScam(hostel);

  await hostel.save();

  req.flash("success", "Report submitted");

  res.redirect(`/hostels/${id}`);
};

// ADMIN VIEW
module.exports.getReports = async (req, res) => {
  const reports = await Report.find({})
    .populate("listingId")
    .populate("reportedBy");

  res.render("admin/reports", { reports });
};

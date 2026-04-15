const Hostel = require("../models/Hostel");

module.exports.index = async (req, res) => {
  const hostels = await Hostel.find({}).populate("owner");

  res.render("hostels/index", { hostels });
};

module.exports.showHostel = async (req, res) => {
  const hostel = await Hostel.findById(req.params.id).populate("owner");

  res.render("hostels/show", { hostel });
};

module.exports.newForm = (req, res) => {
  res.render("hostels/new");
};

module.exports.createHostel = async (req, res) => {
  try {
    const hostel = new Hostel(req.body.hostel || req.body);

    hostel.owner = req.user._id;

    if (req.file) {
      hostel.images.push({
        url: req.file.path,
        filename: req.file.filename,
      });
    }

    await hostel.save();

    req.flash("success", "Hostel Created");

    res.redirect("/hostels");
  } catch (err) {
    console.log(err);
    req.flash("error", err.message);
    res.redirect("/hostels/new");
  }
};

module.exports.editForm = async (req, res) => {
  const hostel = await Hostel.findById(req.params.id);

  res.render("hostels/edit", { hostel });
};

module.exports.updateHostel = async (req, res) => {
  const { id } = req.params;

  const hostel = await Hostel.findByIdAndUpdate(id, req.body);

  req.flash("success", "Hostel Updated");

  res.redirect(`/hostels/${id}`);
};

module.exports.deleteHostel = async (req, res) => {
  const { id } = req.params;

  await Hostel.findByIdAndDelete(id);

  req.flash("success", "Hostel Deleted");

  res.redirect("/hostels");
};

// PART 6 — SEARCH SYSTEM

module.exports.searchHostels = async (req, res) => {
  const { location } = req.query;

  const hostels = await Hostel.find({
    location: { $regex: location, $options: "i" },
  });

  res.render("hostels/index", { hostels });
};

module.exports.filterHostels = async (req, res) => {
  const { roomType } = req.query;

  const hostels = await Hostel.find({ roomType });

  res.render("hostels/index", { hostels });
};

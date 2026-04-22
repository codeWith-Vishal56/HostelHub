const Hostel = require("../models/Hostel");
const detectScam = require("../utils/detectScam");

// 🔹 Show all hostels
module.exports.index = async (req, res) => {
  const hostels = await Hostel.find({}).populate("owner");
  res.render("hostels/index", { hostels });
};

// 🔹 Show single hostel
module.exports.showHostel = async (req, res) => {
  const hostel = await Hostel.findById(req.params.id).populate("owner");

  if (!hostel) {
    req.flash("error", "Hostel not found");
    return res.redirect("/hostels");
  }

  res.render("hostels/show", { hostel });
};

// 🔹 New form
module.exports.newForm = (req, res) => {
  res.render("hostels/new");
};

// 🔹 Create hostel (CLEAN VERSION)
module.exports.createHostel = async (req, res) => {
  try {
    const hostel = new Hostel(req.body.hostel || req.body);

    hostel.owner = req.user._id;

    hostel.phone = req.body.phone || "";
    hostel.email = req.body.email || "";

    // ✅ Image upload
    if (req.file) {
      hostel.images.push({
        url: req.file.path,
        filename: req.file.filename,
      });
    }

    // ✅ Scam detection
    hostel.isSuspicious = detectScam(hostel);

    await hostel.save();

    req.flash("success", "Hostel Created Successfully 🚀");
    res.redirect("/hostels");
  } catch (err) {
    console.log("FULL ERROR 👉", err);

    // 🔥 IMPORTANT FIX
    let message = "Something went wrong";

    if (err.message) {
      message = err.message;
    }

    if (err.errors) {
      // mongoose validation error
      message = Object.values(err.errors)
        .map((e) => e.message)
        .join(", ");
    }

    req.flash("error", message);
    res.redirect("/hostels/new");
  }
};

// 🔹 Edit form
module.exports.editForm = async (req, res) => {
  const hostel = await Hostel.findById(req.params.id);

  if (!hostel) {
    req.flash("error", "Hostel not found");
    return res.redirect("/hostels");
  }

  res.render("hostels/edit", { hostel });
};

// 🔹 Update hostel (CLEAN)
module.exports.updateHostel = async (req, res) => {
  const { id } = req.params;

  const updateData = req.body.hostel || req.body;

  await Hostel.findByIdAndUpdate(id, updateData);

  req.flash("success", "Hostel Updated");
  res.redirect(`/hostels/${id}`);
};

// 🔹 Delete hostel
module.exports.deleteHostel = async (req, res) => {
  const { id } = req.params;

  await Hostel.findByIdAndDelete(id);

  req.flash("success", "Hostel Deleted");
  res.redirect("/hostels");
};

// 🔹 Search
module.exports.searchHostels = async (req, res) => {
  const { location } = req.query;

  const hostels = await Hostel.find({
    location: { $regex: location, $options: "i" },
  });

  res.render("hostels/index", { hostels });
};

// 🔹 Filter
module.exports.filterHostels = async (req, res) => {
  const { roomType } = req.query;

  const hostels = await Hostel.find({ roomType });

  res.render("hostels/index", { hostels });
};

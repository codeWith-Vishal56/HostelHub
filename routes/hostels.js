const express = require("express");
const router = express.Router();

const hostelController = require("../controllers/hostelController");
const { isLoggedIn } = require("../middleware/auth");
const upload = require("../middleware/upload");

// ✅ INDEX
router.get("/", hostelController.index);

// ✅ SEARCH & FILTER (put BEFORE :id)
router.get("/search", hostelController.searchHostels);
router.get("/filter", hostelController.filterHostels);

// ✅ CREATE
router.get("/new", isLoggedIn, hostelController.newForm);

router.post(
  "/",
  isLoggedIn,
  upload.single("image"),
  hostelController.createHostel,
);

// ✅ SHOW (single hostel)
router.get("/:id", hostelController.showHostel);

// ✅ EDIT
router.get("/:id/edit", isLoggedIn, hostelController.editForm);

// ✅ UPDATE
router.put("/:id", isLoggedIn, hostelController.updateHostel);

// ✅ DELETE
router.delete("/:id", isLoggedIn, hostelController.deleteHostel);

module.exports = router;

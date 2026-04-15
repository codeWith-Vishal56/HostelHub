const express = require("express");
const router = express.Router();

const hostelController = require("../controllers/hostelController");

const { isLoggedIn } = require("../middleware/auth");

const upload = require("../middleware/upload");

router.get("/", hostelController.index);

router.get("/new", isLoggedIn, hostelController.newForm);

router.post(
  "/",
  isLoggedIn,
  upload.single("image"),
  hostelController.createHostel,
);

router.get("/:id", hostelController.showHostel);

router.get("/:id/edit", isLoggedIn, hostelController.editForm);

router.put("/:id", isLoggedIn, hostelController.updateHostel);

router.delete("/:id", isLoggedIn, hostelController.deleteHostel);

router.get("/search", hostelController.searchHostels);

router.get("/filter", hostelController.filterHostels);

module.exports = router;

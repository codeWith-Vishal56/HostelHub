const express = require("express");
const router = express.Router();

const friendController = require("../controllers/friendController");
const { isLoggedIn } = require("../middleware/auth");

// profile
router.get("/new", isLoggedIn, friendController.newForm);
router.post("/", isLoggedIn, friendController.createProfile);

// browse
router.get("/", isLoggedIn, friendController.index);

// filter
router.get(
  "/interest/:interest",
  isLoggedIn,
  friendController.filterByInterest,
);

// requests
router.post("/request/:id", isLoggedIn, friendController.sendRequest);
router.post("/accept/:id", isLoggedIn, friendController.acceptRequest);

module.exports = router;

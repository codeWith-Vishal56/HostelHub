const express = require("express");
const router = express.Router();

const roommateController = require("../controllers/roommateController");
const { isLoggedIn } = require("../middleware/auth");

// MATCH ROUTE (keep at top - specific route)
router.get("/match", isLoggedIn, roommateController.getMatches);

// CREATE FORM
router.get("/new", isLoggedIn, roommateController.newForm);

// CREATE POST
router.post("/", isLoggedIn, roommateController.createPost);

// INDEX (list all roommate posts)
router.get("/", roommateController.index);

module.exports = router;

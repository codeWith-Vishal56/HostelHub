const express = require("express");
const router = express.Router();

const roommateController = require("../controllers/roommateController");

const { isLoggedIn } = require("../middleware/auth");

router.get("/", roommateController.index);

router.get("/new", isLoggedIn, roommateController.newForm);

router.post("/", isLoggedIn, roommateController.createPost);

module.exports = router;

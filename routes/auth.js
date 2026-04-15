const express = require("express");
const router = express.Router();

const passport = require("passport");

const authController = require("../controllers/authController");

router.get("/register", authController.showRegister);

router.post("/register", authController.register);

router.get("/login", authController.showLogin);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect("/");
  },
);

router.get("/logout", authController.logout);

module.exports = router;

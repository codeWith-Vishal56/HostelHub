require("dotenv").config();

const express = require("express");
const app = express();

const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const ejsMate = require("ejs-mate");

const passport = require("./config/passport");
const connectDB = require("./config/db");

connectDB();

// VIEW ENGINE
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// SESSION
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  }),
);

// FLASH
app.use(flash());

// PASSPORT (MUST COME AFTER SESSION)
app.use(passport.initialize());
app.use(passport.session());

// GLOBAL VARIABLES
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// ✅ ROUTES (NOW AFTER PASSPORT)
const authRoutes = require("./routes/auth");
const hostelRoutes = require("./routes/hostels");
const reviewRoutes = require("./routes/reviews");
const roommateRoutes = require("./routes/roommates");
const dashboardRoutes = require("./routes/dashboard");
const reportRoutes = require("./routes/reports");

app.use("/", authRoutes);
app.use("/hostels", hostelRoutes);
app.use("/hostels", reviewRoutes);
app.use("/roommates", roommateRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/", reportRoutes);

// HOME
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});

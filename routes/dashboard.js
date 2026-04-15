const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

const { isLoggedIn } = require("../middleware/auth");

router.get("/owner", isLoggedIn, dashboardController.ownerDashboard);

router.get("/tenant", isLoggedIn, dashboardController.tenantDashboard);

module.exports = router;

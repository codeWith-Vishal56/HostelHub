const express = require("express");
const router = express.Router();

const reportController = require("../controllers/reportController");
const { isLoggedIn } = require("../middleware/auth");

// report listing
router.post("/hostels/:id/report", isLoggedIn, reportController.createReport);

// admin view
router.get("/admin/reports", reportController.getReports);

module.exports = router;

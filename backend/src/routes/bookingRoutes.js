const express = require("express");
const router = express.Router();

// Sample route for facility booking
router.get("/", (req, res) => {
    res.send("Booking system route is working!");
});

module.exports = router;

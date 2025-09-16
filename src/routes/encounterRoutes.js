const express = require("express");
const router = express.Router();
const { uploadEncounter } = require("../controllers/encounterController");

router.post("/upload", uploadEncounter);

module.exports = router;

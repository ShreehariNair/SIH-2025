const express = require("express");
const router = express.Router();
const { createConcepts } = require("../controllers/codeController");

router.get("/ingest", createConcepts);

module.exports = router;

const express = require("express");
const router = express.Router();
const { searchCodes, uploadCSV } = require("../controllers/codeController");

router.get("/search", searchCodes);
router.post("/upload", uploadCSV);

module.exports = router;

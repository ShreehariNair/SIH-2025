const express = require("express");
const router = express.Router();
const {
  searchCodes,
  uploadCSV,
  updateMappings,
  createConceptMap,
} = require("../controllers/codeController");

router.get("/search", searchCodes);
router.get("/mapping", updateMappings);
router.post("/upload", uploadCSV);
router.post("/createConceptMap", createConceptMap);

module.exports = router;

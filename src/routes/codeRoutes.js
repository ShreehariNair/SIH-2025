const express = require("express");
const router = express.Router();
const {
  searchCodes,
  uploadCSV,
  updateMappings,
  createConceptMap,
  translate,
} = require("../controllers/codeController.js");

router.get("/search", searchCodes);
router.get("/map", updateMappings);
router.post("/upload", uploadCSV);
router.post("/createConceptMap", createConceptMap);
router.get("/translate", translate).post("/translate", translate);

module.exports = router;

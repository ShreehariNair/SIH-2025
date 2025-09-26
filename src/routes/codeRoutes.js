const express = require("express");
const router = express.Router();
const {
  searchCodes,
  uploadCSV,
  updateMappings,
  createConceptMap,
  translate,
  updateEnglishTerms,
  searchTerms,
} = require("../controllers/codeController.js");

router.get("/search", searchCodes);
router.get("/map", updateMappings);
router.post("/upload", uploadCSV);
router.post("/createConceptMap", createConceptMap);
router.get("/translate", translate);
router.get("/updateTerms", updateEnglishTerms);
router.get("/searchTerms", searchTerms);

module.exports = router;

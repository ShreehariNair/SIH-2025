const express = require("express");
const {
  getCodeSystem,
  getConceptMap,
  fhirTranslate,
} = require("./../controllers/codeController.js");

const router = express.Router();

router.get("/CodeSystem", getCodeSystem);
router.get("/ConceptMap", getConceptMap);
router.route("/$translate").get(fhirTranslate).post(fhirTranslate);

module.exports = router;

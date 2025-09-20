const express = require("express");
const router = express.Router();
const { uploadEncounter,getEncountersByPatient } = require("../controllers/encounterController");

router.post("/upload", uploadEncounter);
router.get("/:patientId", getEncountersByPatient);
module.exports = router;

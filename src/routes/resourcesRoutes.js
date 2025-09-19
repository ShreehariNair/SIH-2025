const express = require("express");
const { getCodeSystem } = require("./../controllers/codeController.js");

const router = express.Router();

router.get("/CodeSystem", getCodeSystem);

module.exports = router;

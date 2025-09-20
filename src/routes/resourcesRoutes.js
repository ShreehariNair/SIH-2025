const express = require("express");
const { getCodeSystem } = require("./../controllers/codeController.js");

const router = express.Router();

router.get("/codesystem", getCodeSystem);

module.exports = router;

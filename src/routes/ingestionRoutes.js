const express = require("express");
const router = express.Router();
const { createConcepts } = require("../controllers/codeController");

router.post("/namaste", createConcepts);

router.get("/test", (req, res) => {
  res.json({ message: "Ingestion route is working!" });
});

module.exports = router;

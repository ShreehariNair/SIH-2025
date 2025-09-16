const NamasteCode = require("../models/NamasteCode");
const loadCSV = require("../utils/csvLoader");

exports.searchCodes = async (req, res) => {
  try {
    const { q } = req.query;
    const codes = await NamasteCode.find({
      display: { $regex: q, $options: "i" }
    }).limit(20);
    res.json(codes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.uploadCSV = async (req, res) => {
  try {
    const message = await loadCSV("data/namaste.csv");
    res.json({ message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

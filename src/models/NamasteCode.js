const mongoose = require("mongoose");

const NamasteCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  display: { type: String, required: true },
  category: { type: String },
  version: { type: String, default: "1.0" }
}, { timestamps: true });

module.exports = mongoose.model("NamasteCode", NamasteCodeSchema);

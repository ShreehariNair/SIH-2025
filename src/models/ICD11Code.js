const mongoose = require("mongoose");

const ICD11CodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  display: { type: String, required: true },
  category: { type: String },
  version: { type: String, default: "1.0" }
}, { timestamps: true });

module.exports = mongoose.model("ICD11Code", ICD11CodeSchema);
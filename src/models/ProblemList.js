const mongoose = require("mongoose");

const ProblemListSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  diagnoses: [
    {
      namasteCode: { type: String, required: true },
      icdCode: { type: String },
      display: { type: String },
      recordedAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("ProblemList", ProblemListSchema);

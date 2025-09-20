const mongoose = require("mongoose");

const problemListSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true },
    diagnoses: [
      {
        namaste: {
          code: String,
          display: String,
        },
        icd11: {
          code: String,
          display: String,
        },
        recordedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);


module.exports = mongoose.model("ProblemList", problemListSchema);

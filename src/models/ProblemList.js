const mongoose = require("mongoose");

const problemListSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true, unique: true },
    name: { type: String, default: "New Patient" },
    dob: { type: Date, default: null },
    gender: { type: String, enum: ['Male', 'Female', 'Other', null], default: null },
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
        notes: String, // The new field to store clinical notes
        recordedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProblemList", problemListSchema);
const mongoose = require("mongoose");

const conceptSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "A concept must have a code"],
    },
    display: {
      type: String,
      required: [true, "A concept must have a display"],
    },
    definition: {
      type: String,
      //   required: [true, "A concept must have a definition"],
    },
    designation: [{ language: String, value: String }],
    ICD11Code: {
      type: String,
    },
    nameEnglish: String,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Concept = mongoose.model("Concept", conceptSchema);

module.exports = Concept;

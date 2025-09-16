const ProblemList = require("../models/ProblemList");

exports.uploadEncounter = async (req, res) => {
  try {
    const { patientId, diagnoses } = req.body;
    const problemList = await ProblemList.findOneAndUpdate(
      { patientId },
      { $push: { diagnoses: { $each: diagnoses } } },
      { upsert: true, new: true }
    );
    res.json(problemList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

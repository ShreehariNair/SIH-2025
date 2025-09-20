const ProblemList = require("../models/ProblemList");

exports.uploadEncounter = async (req, res) => {
  try {
    const { patientId, diagnoses } = req.body;

    if (!patientId || !Array.isArray(diagnoses)) {
      return res.status(400).json({ error: "patientId and diagnoses are required" });
    }

    const formattedDiagnoses = diagnoses.map((d) => ({
      namaste: {
        code: d.namaste?.code || d.namasteCode, 
        display: d.namaste?.display || d.display,
      },
      icd11: {
        code: d.icd11?.code || d.icdCode,
        display: d.icd11?.display || d.display,
      },
      recordedAt: new Date(),
    }));

    
    const problemList = await ProblemList.findOneAndUpdate(
      { patientId },
      { $push: { diagnoses: { $each: formattedDiagnoses } } },
      { upsert: true, new: true }
    );

    res.json(problemList);
  } catch (err) {
    console.error("Upload Encounter Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// New: fetch encounters by patientId
exports.getEncountersByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const problemList = await ProblemList.findOne({ patientId });

    if (!problemList) {
      return res.status(404).json({ error: "No encounters found for this patient" });
    }

    res.json(problemList);
  } catch (err) {
    console.error("Fetch Encounter Error:", err);
    res.status(500).json({ error: err.message });
  }
};

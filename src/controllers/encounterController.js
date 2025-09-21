const ProblemList = require("../models/ProblemList");

exports.uploadEncounter = async (req, res) => {
  try {
    const { patientId, patientName, patientDob, patientGender, diagnoses } = req.body;

    if (!patientId || !Array.isArray(diagnoses)) {
      return res.status(400).json({ error: "patientId and diagnoses are required" });
    }

    let problemList = await ProblemList.findOne({ patientId });

    const formattedDiagnoses = diagnoses.map(d => ({
      namaste: { code: d.namaste?.code, display: d.namaste?.display },
      icd11: { code: d.icd11?.code, display: d.icd11?.display },
      notes: d.notes, // The new field being added
      recordedAt: new Date(),
    }));

    if (!problemList) {
      // Create a new patient record if one doesn't exist
      problemList = await ProblemList.create({
        patientId,
        name: patientName,
        dob: patientDob,
        gender: patientGender,
        diagnoses: formattedDiagnoses,
      });
    } else {
      // Update existing patient's diagnoses
      problemList = await ProblemList.findOneAndUpdate(
        { patientId },
        { $push: { diagnoses: { $each: formattedDiagnoses } } },
        { new: true }
      );
    }

    const patientData = {
      patientId: problemList.patientId,
      name: problemList.name,
      dob: problemList.dob,
      gender: problemList.gender,
      activeDiagnoses: problemList.diagnoses.length,
      lastVisit: problemList.diagnoses.length > 0 ? problemList.diagnoses[problemList.diagnoses.length - 1].recordedAt : null,
      encounters: [{
        date: new Date(),
        diagnoses: problemList.diagnoses,
      }],
    };

    res.json(patientData);
  } catch (err) {
    console.error("Upload Encounter Error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getEncountersByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const problemList = await ProblemList.findOne({ patientId });

    if (!problemList) {
      return res.status(404).json({ error: 'Patient not found. Please create a new patient.' });
    }

    const patientData = {
      patientId: problemList.patientId,
      name: problemList.name,
      dob: problemList.dob,
      gender: problemList.gender,
      activeDiagnoses: problemList.diagnoses.length,
      lastVisit: problemList.diagnoses.length > 0 ? problemList.diagnoses[problemList.diagnoses.length - 1].recordedAt : null,
      encounters: [{
        date: problemList.diagnoses.length > 0 ? problemList.diagnoses[problemList.diagnoses.length - 1].recordedAt : new Date(),
        diagnoses: problemList.diagnoses,
      }],
    };

    res.json(patientData);
  } catch (err) {
    console.error('Fetch Encounter Error:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};
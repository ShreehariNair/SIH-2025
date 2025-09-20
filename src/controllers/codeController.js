const conceptMapFormat = require("./../../data/resources/conceptMap.js");
const NamasteCode = require("./../models/NamasteCode");
const loadCSV = require("../utils/csvLoader");
const { loadNamaste } = require("./../utils/loadNamaste.js");
const Concept = require("./../models/conceptModel.js");
const ConceptMap = require("./../models/conceptMapModel.js");

exports.searchCodes = async (req, res) => {
  try {
    const { q } = req.query;
    const codes = await NamasteCode.find({
      display: { $regex: q, $options: "i" },
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

// Controller for loading concepts by internal developers
exports.createConcepts = async (req, res, next) => {
  try {
    const namasteJSON = await loadNamaste();
    const concepts = namasteJSON.map((namaste) => {
      return {
        code: namaste.term_id,
        display: `${namaste.term_devanagari} (${namaste.term_iast}})`,
        definition: namaste.w_def,
        designation: [{ language: "en", value: namaste.w_trans }],
      };
    });
    console.log(namasteJSON.at(10));

    const codeSystem = {
      resourceType: "CodeSystem",
      id: "namaste-ayurveda",
      url: "https://ayush.gov.in/fhir/CodeSystem/namaste-ayurveda",
      version: "2025-09",
      name: "NAMASTE_Ayurveda",
      title: "NAMASTE Ayurveda Diagnostic Terms",
      status: "active",
      content: "complete",
      concept: [
        {
          code: "AAA-1",
          display: "वातसञ्चयः (vātasañcayaḥ)",
          definition: "accumulation of vāta",
          designation: [
            { language: "en", value: "accumulation of vāta" },
            { language: "sa-Deva", value: "वातसञ्चयः" },
            { language: "sa-Latn", value: "vātasañcayaḥ" },
            { language: "namaste", value: "vAtasa~jcayaH" },
          ],
        },
      ],
    };

    const concept = await Concept.create(concepts);

    res.status(200).json({
      status: "success",
      data: concept.slice(5, 10),
      message: "CSV parsed successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: "fail", message: err.message });
  }
};

exports.getCodeSystem = async (req, res, next) => {
  try {
    const codeSystem = {
      resourceType: "CodeSystem",
      id: "NAMASTE",
      url: "https://ayush.gov.in/",
      version: "2025-09",
      name: "NAMASTE",
      status: "active",
      experimental: true,
      content: "not-present",
    };

    res.status(200).json({ status: "success", codeSystem });
  } catch (err) {
    res.status(500).json({ status: "fail", message: "Server Error" });
  }
};

exports.updateMappings = async (req, res, next) => {
  try {
    const namasteMap = await loadNamaste("data/mapping.csv");
    const data = await Promise.all(
      namasteMap.map(
        async (map) =>
          await Concept.updateOne(
            { code: map.NAMC_CODE },
            { ICD11Code: map.ICD_11_CODE }
          )
      )
    );
    res.status(200).json({
      status: "success",
      message: "Mapping Uploaded",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};

exports.createConceptMap = async (req, res, next) => {
  try {
    if (!req.body)
      return res.status(500).json({
        status: "fail",
        message:
          "Invalid Data Received. Please provide a valid FHIR R4 Compliant ConceptMap Resource",
      });

    const query = ConceptMap.create(req.body);
    const data = await query.save();
  } catch (err) {
    res.status(200).json({
      status: "success",
      data,
      message: "FHIR Concept Map was created successfully",
    });
  }
};

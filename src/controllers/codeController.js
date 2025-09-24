const NamasteCode = require("./../models/NamasteCode");
const ICD11Code = require("./../models/ICD11Code");
const loadCSV = require("../utils/csvLoader");
const { loadNamaste } = require("./../utils/loadNamaste.js");
const fetchICD11 = require("./../utils/fetchICD11.js");
const createParameterResource = require("./../utils/createParameterResource.js");
const Concept = require("./../models/conceptModel.js");
const ConceptMap = require("./../models/conceptMapModel.js");

exports.searchCodes = async (req, res) => {
  try {
    const { query, type } = req.query;
    let codes;

    if (type === "namaste") {
      codes = await NamasteCode.find({
        display: { $regex: query, $options: "i" },
      }).limit(20);
    } else if (type === "icd") {
      codes = await ICD11Code.find({
        display: { $regex: query, $options: "i" },
      }).limit(20);
    } else {
      return res.status(400).json({ error: "Invalid code type specified." });
    }
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

exports.getConceptMap = async (req, res, next) => {
  try {
    const data = await fetchICD11();

    const conceptMap = {
      resourceType: "ConceptMap",
      conceptmap_id: "namaste-to-icd11tm2-2025",
      url: "https://api.sih2025.in/ConceptMap/namaste-to-icd11tm2",
      version: "2025.09.20",
      name: "NamasteToICD11TM2ConceptMap",
      title: "ConceptMap: NAMASTE to ICD-11 TM2 Mapping",
      status: "active",
      experimental: false,
      date: "2025-09-21T07:25:54.394Z",
      publisher: "SIH-2025 Consortium",
      contact: [
        {
          name: "SIH-2025 Support",
          telecom: [
            {
              system: "email",
              value: "support@sih2025.in",
            },
          ],
        },
      ],
      description:
        "Maps NAMASTE codes (Indian Traditional Medicine) to ICD-11 TM2 codes for use in FHIR-compliant EHR/EMR systems.",
      useContext: [
        {
          code: {
            system: "http://terminology.hl7.org/CodeSystem/usage-context-type",
            code: "focus",
          },
          valueCodeableConcept: {
            coding: [
              {
                system: "http://sih2025.in/CodeSystem/",
                code: "traditional-medicine",
              },
            ],
          },
        },
      ],
      jurisdiction: [
        {
          coding: [
            {
              system: "urn:iso:std:iso:3166",
              code: "IN",
              display: "India",
            },
          ],
        },
      ],
      purpose:
        "To enable standardised interoperability and analytics by mapping NAMASTE codes to ICD-11 TM2 codes in Indian EHRs.",
      copyright:
        "© SIH-2025 Consortium, 2025. Licensed for use in Indian EHR/EMR systems.",
      copyrightLabel: "SIH-2025 2025",
      approvalDate: "2025-09-21T07:25:54.395Z",
      lastReviewDate: "2025-09-21T07:25:54.395Z",
      effectivePeriod: {
        start: "2025-09-21T07:25:54.395Z",
        end: "2025-09-21T07:25:54.395Z",
      },
      topic: [
        {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "394803006",
              display: "Traditional medicine",
            },
          ],
        },
      ],
      author: [
        {
          name: "SIH-2025 Mapping Team",
        },
      ],
      editor: [
        {
          name: "SIH-2025 Standards Editor",
        },
      ],
      reviewer: [
        {
          name: "Indian EHR Standards Reviewer",
        },
      ],
      endorser: [
        {
          name: "National Resource Centre for EHR Standards",
        },
      ],
      relatedArtifact: [
        {
          type: "documentation",
          display: "NAMASTE Terminology Specification",
          url: "https://nrcehrs.org/namaste",
        },
        {
          type: "documentation",
          display: "ICD-11 TM2 Specification",
          url: "https://icd.who.int/icdapi",
        },
      ],
      property: [
        {
          code: "mapping-quality",
          uri: "https://api.sih2025.in/ConceptMap/property/mapping-quality",
          description:
            "Quality of the code mapping (manual, automated, expert-reviewed)",
          type: "code",
          system: "https://api.sih2025.in/CodeSystem/mapping-quality",
        },
      ],
      additionalAttribute: [
        {
          code: "clinical-context",
          uri: "https://api.sih2025.in/ConceptMap/attribute/clinical-context",
          description:
            "Clinical context required for mapping (e.g., age, gender)",
          type: "string",
        },
      ],
      sourceScopeUri: "https://api.sih2025.in/ValueSet/namaste",
      targetScopeUri: "https://id.who.int/icd/release/11/2023-01/mms",
    };
    res.status(200).json({ status: "success", conceptMap });
  } catch (err) {
    res.status(500).json({ status: "fail", message: "Server Error" });
  }
};
exports.updateMappings = async (req, res, next) => {
  try {
    const namasteMap = await loadNamaste("data/namaste_codes.csv");
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

exports.translate = async (req, res, next) => {
  try {
    const query = req.method === "GET" ? req.query : req.body;

    if (!query?.system || !query?.target) {
      return res.status(400).json({
        status: "error",
        message: "Please specify a valid source and target CodeSystem",
      });
    }
    if (!query?.code) {
      return res.status(404).json({
        status: "fail",
        message: "Please enter a valid Namaste code",
      });
    }

    const namasteCode = query.code;

    const map = await Concept.findOne(
      { code: namasteCode },
      "code ICD11Code display"
    );

    if (!map) {
      return res.status(404).json({
        status: "fail",
        message: `No mapping found for code: ${namasteCode}. Please ensure the code exists in the database.`,
      });
    }

    if (!map.ICD11Code) {
      return res.status(404).json({
        status: "fail",
        message: `The Namaste code ${namasteCode} does not have an ICD-11 mapping.`,
      });
    }

    // Prepare the response data object
    const responseMap = {
      code: map.code,
      ICD11Code: map.ICD11Code,
      namasteName: map.display,
    };

    // Fetch the display name for the ICD-11 code using the external utility
    let icd11Data;
    try {
      icd11Data = await fetchICD11(responseMap);
    } catch (fetchErr) {
      console.error("Error fetching ICD-11 details:", fetchErr);
      return res.status(500).json({
        status: "error",
        message: "Server error: Failed to retrieve ICD-11 display name.",
      });
    }

    // Extract the display name from the ICD-11 response
    const displayParameter = icd11Data?.parameter.find(
      (d) => d?.name === "display"
    );
    responseMap.ICD11Name =
      displayParameter?.valueString || "ICD-11 name not found";

    // Create a FHIR Parameters resource for the final response
    // const fhirResponse = createParameterResource(responseMap);

    res.status(200).json({
      status: "success",
      map: responseMap,
      message: "Translated NAMASTE code to ICD-11 code",
      // fhirResource: fhirResponse
    });
  } catch (err) {
    console.error("Translation error:", err);
    res.status(500).json({
      status: "error",
      message:
        "Server error during translation. Please check the backend logs.",
    });
  }
};

exports.fhirTranslate = async (req, res, next) => {
  try {
    const query = req.method === "GET" ? req.query : req.body;

    if (!query?.system || !query?.target)
      return res.status(500).json({
        status: "error",
        message: "Please specify a valid source and target CodeSystem",
      });
    if (!query?.code)
      return res.status(404).json({
        status: "fail",
        message: "Please enter a valid Namaste code",
      });

    let map = await Concept.findOne(
      { code: query.code },
      "code ICD11Code display"
    );
    map = {
      code: map.code,
      ICD11Code: map.ICD11Code,
      namasteName: map.display,
    };

    if (!Object.keys(map).length)
      return res
        .status(404)
        .json({ status: "success", message: "No mappings were found" });

    let data = await fetchICD11(map);
    data = data.parameter.find((d) => d?.name === "display");
    map.ICD11Name = data.valueString;
    console.log(map);

    data = createParameterResource(map);
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

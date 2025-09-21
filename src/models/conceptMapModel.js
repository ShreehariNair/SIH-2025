const mongoose = require("mongoose");

const conceptMapSchema = new mongoose.Schema({
  resourceType: {
    type: String,
    default: "ConceptMap",
    immutable: true,
    required: [true, "Resource type is required."],
  },
  conceptmap_id: {
    type: String,
    immutable: true,
    required: [true, "ConceptMap ID is required."],
  },
  url: {
    type: String,
    immutable: true,
    required: [true, "ConceptMap URL is required."],
  },
  version: {
    type: String,
    immutable: true,
    required: [true, "ConceptMap version is required."],
  },
  name: {
    type: String,
    immutable: true,
    required: [true, "ConceptMap name is required."],
  },
  title: {
    type: String,
    immutable: true,
    default: "ConceptMap: NAMASTE to ICD-11 TM2 Mapping",
  },
  status: {
    type: String,
    immutable: true,
    required: [true, "ConceptMap status is required."],
  },
  experimental: {
    type: Boolean,
    immutable: true,
    required: [true, "Experimental flag is required."],
  },
  date: {
    type: String,
    immutable: true,
    default: new Date().toISOString(),
  },
  publisher: {
    type: String,
    immutable: true,
    default: "SIH-2025 Consortium",
  },
  contact: [
    {
      name: { type: String, required: [true, "Contact name is required."] },
      telecom: [
        {
          system: {
            type: String,
            required: [true, "Telecom system is required."],
          },
          value: {
            type: String,
            required: [true, "Telecom value is required."],
          },
        },
      ],
    },
  ],
  description: {
    type: String,
    default:
      "Maps NAMASTE codes (Indian Traditional Medicine) to ICD-11 TM2 codes for use in FHIR-compliant EHR/EMR systems.",
    immutable: true,
  },
  useContext: [
    {
      code: {
        system: {
          type: String,
          required: [true, "UseContext code system is required."],
        },
        code: {
          type: String,
          required: [true, "UseContext code is required."],
        },
      },
      valueCodeableConcept: {
        coding: [
          {
            system: {
              type: String,
              required: [true, "Coding system is required."],
            },
            code: {
              type: String,
              required: [true, "Coding code is required."],
            },
          },
        ],
      },
    },
  ],
  jurisdiction: [
    {
      coding: [
        {
          system: {
            type: String,
            required: [true, "Jurisdiction coding system is required."],
          },
          code: {
            type: String,
            required: [true, "Jurisdiction coding code is required."],
          },
          display: { type: String },
        },
      ],
    },
  ],
  purpose: {
    type: String,
    required: [true, "ConceptMap purpose is required."],
    default:
      "To enable standardised interoperability and analytics by mapping NAMASTE codes to ICD-11 TM2 codes in Indian EHRs.",
  },
  copyright: {
    type: String,
    required: [true, "ConceptMap copyright is required."],
    default:
      "© SIH-2025 Consortium, 2025. Licensed for use in Indian EHR/EMR systems.",
  },
  copyrightLabel: {
    type: String,
    required: [true, "ConceptMap copyright label is required."],
    default: "SIH-2025 2025",
  },
  approvalDate: {
    type: Date,
    required: [true, "Approval date is required."],
  },
  lastReviewDate: {
    type: Date,
    required: [true, "Last review date is required."],
  },
  effectivePeriod: {
    start: {
      type: Date,
      required: [true, "Effective period start date is required."],
    },
    end: {
      type: Date,
      required: [true, "Effective period end date is required."],
    },
  },
  topic: [
    {
      coding: [
        {
          system: {
            type: String,
            required: [true, "Topic coding system is required."],
            default: "http://snomed.info/sct",
          },
          code: {
            type: String,
            required: [true, "Topic coding code is required."],
            default: "394803006",
          },
          display: {
            type: String,
            required: [true, "Topic coding display is required."],
            default: "Traditional medicine",
          },
        },
      ],
    },
  ],
  author: [
    {
      name: {
        type: String,
        required: [true, "Author name is required."],
        default: "SIH-2025 Mapping Team",
      },
    },
  ],
  editor: [
    {
      name: {
        type: String,
        required: [true, "Editor name is required."],
        default: "SIH-2025 Standards Editor",
      },
    },
  ],
  reviewer: [
    {
      name: {
        type: String,
        required: [true, "Reviewer name is required."],
        default: "Indian EHR Standards Reviewer",
      },
    },
  ],
  endorser: [
    {
      name: {
        type: String,
        required: [true, "Endorser name is required."],
        default: "National Resource Centre for EHR Standards",
      },
    },
  ],
  relatedArtifact: [
    {
      type: {
        type: String,
        required: [true, "Related artifact type is required."],
        default: "documentation",
      },
      display: {
        type: String,
        required: [true, "Related artifact display is required."],
        default: "NAMASTE Terminology Specification",
      },
      url: {
        type: String,
        required: [true, "Related artifact URL is required."],
        default: "https://nrcehrs.org/namaste",
      },
    },
    {
      type: {
        type: String,
        required: [true, "Related artifact type is required."],
        default: "documentation",
      },
      display: {
        type: String,
        required: [true, "Related artifact display is required."],
        default: "ICD-11 TM2 Specification",
      },
      url: {
        type: String,
        required: [true, "Related artifact URL is required."],
        default: "https://icd.who.int/icdapi",
      },
    },
  ],
  property: [
    {
      code: {
        type: String,
        required: [true, "Property code is required."],
        default: "mapping-quality",
      },
      uri: {
        type: String,
        required: [true, "Property URI is required."],
        default: "https://api.sih2025.in/ConceptMap/property/mapping-quality",
      },
      description: {
        type: String,
        required: [true, "Property description is required."],
        default:
          "Quality of the code mapping (manual, automated, expert-reviewed)",
      },
      type: {
        type: String,
        required: [true, "Property type is required."],
        default: "code",
      },
      system: {
        type: String,
        required: [true, "Property system is required."],
        default: "https://api.sih2025.in/CodeSystem/mapping-quality",
      },
    },
  ],
  additionalAttribute: [
    {
      code: {
        type: String,
        required: [true, "Additional attribute code is required."],
        default: "clinical-context",
      },
      uri: {
        type: String,
        required: [true, "Additional attribute URI is required."],
        default: "https://api.sih2025.in/ConceptMap/attribute/clinical-context",
      },
      description: {
        type: String,
        required: [true, "Additional attribute description is required."],
        default: "Clinical context required for mapping (e.g., age, gender)",
      },
      type: {
        type: String,
        required: [true, "Additional attribute type is required."],
        default: "string",
      },
    },
  ],
  sourceScopeUri: {
    type: String,
    required: [true, "Source scope URI is required."],
    default: "https://api.sih2025.in/ValueSet/namaste",
  },
  targetScopeUri: {
    type: String,
    required: [true, "Target scope URI is required."],
    default: "https://id.who.int/icd/release/11/2023-01/mms",
  },
  group: [
    {
      source: {
        type: "String",
        default: "https://api.sih2025.in/CodeSystem/namaste",
      },
      target: {
        type: "String",
        default: "http://id.who.int/icd/entity/1639997017",
      },
      element: [
        {
          code: String,
          display: String,
          target: [
            {
              code: String,
              display: String,
              relationship: {
                type: String,
                enum: [
                  "equivalent",
                  "related-to",
                  "source-is-narrower-than-target",
                  "source-is-broader-than-target",
                  "not-related-to",
                ],
                default: "related-to",
              },
            },
          ],
        },
      ],
    },
  ],
});

const ConceptMap = mongoose.model("conceptMap", conceptMapSchema);
module.export = ConceptMap;

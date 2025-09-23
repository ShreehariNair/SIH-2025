const createParameterResource = (data) => {
  // Default if no match for the concept is found in ICD-11
  if (!Object.keys(data)?.length)
    return {
      resourceType: "Parameters",
      parameter: [
        {
          name: "result",
          valueBoolean: false,
        },
        {
          name: "message",
          valueString: "No mappings found for the given code.",
        },
      ],
    };

  const parameter = {
    resourceType: "Parameters",
    parameter: [
      {
        name: "result",
        valueBoolean: true,
      },
      {
        name: "match",
        part: [
          {
            name: "equivalence",
            valueCode: "relatedto",
          },
          {
            name: "concept",
            valueCoding: {
              system: "http://id.who.int/icd/release/11/mms",
              code: data.ICD11Code,
              display: data.ICD11Name,
            },
          },
        ],
      },
    ],
  };

  return parameter;
};

module.exports = createParameterResource;

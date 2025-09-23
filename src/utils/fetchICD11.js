const axios = require("axios/dist/node/axios.cjs");

async function fetchICD11(map) {
  try {
    const response = await axios.get(
      `http://localhost:80/fhir/CodeSystem/$validate-code?url=http://id.who.int/icd/release/11/mms&code=${map.ICD11Code}`,
      {
        headers: {
          Accept: "application/json",
          "Accept-Language": "en",
          "API-Version": "v2",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

module.exports = fetchICD11;

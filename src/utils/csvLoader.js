const fs = require("fs");
const csv = require("csv-parser");
const NamasteCode = require("../models/NamasteCode");

const loadCSV = async (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          for (let row of results) {
            await NamasteCode.findOneAndUpdate(
              { code: row.code },
              { display: row.display, category: row.category },
              { upsert: true }
            );
          }
          resolve("CSV data loaded successfully");
        } catch (err) {
          reject(err);
        }
      });
  });
};

module.exports = loadCSV;

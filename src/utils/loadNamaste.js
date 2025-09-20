const fs = require("fs");
const csv = require("csv-parser");
let namasteCSV = [];

exports.loadNamaste = async function (filePath = "data/namaste_ayurveda.csv") {
  return new Promise((resolve, reject) => {
    try {
      fs.createReadStream(filePath, { encoding: "utf8" })
        .pipe(csv())
        .on("data", (data) => namasteCSV.push(data))
        .on("end", () => {
          console.log("CSV Parsed successfully");
          resolve(namasteCSV);
        });
    } catch (err) {
      reject(err.message);
    }
  });
};

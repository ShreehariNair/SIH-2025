const express = require("express");
const cors = require("cors");

const codeRoutes = require("./routes/codeRoutes");
const encounterRoutes = require("./routes/encounterRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/codes", codeRoutes);
app.use("/api/encounters", encounterRoutes);

module.exports = app;

const express = require("express");
const cors = require("cors");

const codeRoutes = require("./routes/codeRoutes");
const encounterRoutes = require("./routes/encounterRoutes");
const ingestionRoutes = require("./routes/ingestionRoutes");
const resourcesRoutes = require("./routes/resourcesRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/codes", codeRoutes);
app.use("/api/v1/encounters", encounterRoutes);

app.use("/api/v1/ingestion", ingestionRoutes);
app.use("/api/v1/resources/", resourcesRoutes);

module.exports = app;

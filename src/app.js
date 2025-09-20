const express = require("express");
const cors = require("cors");

const codeRoutes = require("./routes/codeRoutes");
const encounterRoutes = require("./routes/encounterRoutes");
const ingestionRoutes = require("./routes/ingestionRoutes");
const resourcesRoutes = require("./routes/resourcesRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/codes", codeRoutes);
app.use("/api/encounters", encounterRoutes);

app.use("/api/ingestion", ingestionRoutes);
app.use("/api/resources", resourcesRoutes);

module.exports = app;

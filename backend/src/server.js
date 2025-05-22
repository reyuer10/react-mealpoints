const express = require("express");
const databaseQuery = require("../config/databaseQuery");
const handleIntervalExecute = require("../services/intervalExecute");

// const punycode = require("punycode/");

const app = express();
app.use(express.json());

const sheetsRoutes = require("../routes/sheetsRoutes");

app.get("/", async (req, res) => {
  const query = "SELECT * FROM tb_mealpoints";

  const results = await databaseQuery(query);

  return res.status(200).send(results);
});

app.use("/", sheetsRoutes);

const PORT = process.env.PORT || 3005;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server is running on port", PORT);
});

handleIntervalExecute();

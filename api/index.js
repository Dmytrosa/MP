const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Wheat = require("./models/wheat"); // Шлях до вашого файлу wheat.js

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://Usss:54i2bG9odeSppLUt@cluster0.lfemigz.mongodb.net/", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error Connecting to MongoDB");
  });

app.listen(port, () => {
  console.log("Server is running on port 3000");
});


app.post("/addWheat", (req, res) => {
    const { year, productionTonnage, productionValueUSD } = req.body;
    const newWheatEntry = new Wheat({
      year,
      productionTonnage,
      productionValueUSD,
    });
  
    newWheatEntry
      .save()
      .then(() => {
        res.status(201).json({ message: "Wheat entry added successfully" });
      })
      .catch((error) => {
        res.status(500).json({ error: "Error adding wheat entry" });
      });
  });

  app.get("/getAllWheat", async (req, res) => {
    try {
      const allWheatEntries = await Wheat.find();
      res.status(200).json(allWheatEntries);
    } catch (error) {
      console.error("Error retrieving wheat entries:", error);
      res.status(500).json({ error: "Error retrieving wheat entries" });
    }
  });

  app.delete("/deleteWheat/:id", async (req, res) => {
    const wheatId = req.params.id;
  
    try {
      await Wheat.findByIdAndDelete(wheatId);
      res.status(200).json({ message: "Wheat entry deleted successfully" });
    } catch (error) {
      console.error("Error deleting wheat entry:", error);
      res.status(500).json({ error: "Error deleting wheat entry" });
    }
  });
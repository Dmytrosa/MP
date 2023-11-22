const mongoose = require("mongoose");

const wheatSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  productionTonnage: {
    type: Number,
    required: true,
  },
  productionValueUSD: {
    type: Number,
    required: true,
  },
});

const Wheat = mongoose.model("Wheat", wheatSchema);

module.exports = Wheat;
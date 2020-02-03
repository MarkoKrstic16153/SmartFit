const mongoose = require("mongoose");
var planTreninga = mongoose.model("planTreninga", {
  usernameInstruktora: { type: String },
  usernameKlijenta: { type: String },
  treninzi: { type: JSON },
  naziv: { type: String },
  datum: { type: String },
  komentari: { type: [JSON] }
});

module.exports = { planTreninga };

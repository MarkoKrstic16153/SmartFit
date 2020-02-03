const mongoose = require("mongoose");
var planIshrane = mongoose.model("planIshrane", {
  usernameInstruktora: { type: String },
  usernameKlijenta: { type: String },
  dani: { type: JSON },
  naziv: { type: String },
  datum: { type: String },
  komentari: { type: [JSON] }
});

module.exports = { planIshrane };

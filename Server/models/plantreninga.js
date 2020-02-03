const mongoose = require("mongoose");
var plantreninga = mongoose.model("plantreninga", {
  usernameInstruktora: { type: String },
  usernameKlijenta: { type: String },
  treninzi: { type: JSON },
  naziv: { type: String },
  datum: { type: String },
  komentari: { type: JSON }
});

module.exports = { plantreninga };

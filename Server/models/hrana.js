const mongoose = require("mongoose");
var Hrana = mongoose.model("hrana", {
  ime: { type: String },
  proteini: { type: Number },
  ugljeniHidrati: { type: Number },
  masti: { type: Number },
  vlakna: { type: Number }
});

module.exports = { Hrana };

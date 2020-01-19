const mongoose = require("mongoose");
var Instruktor = mongoose.model("instruktor", {
  ime: { type: String },
  prezime: { type: String },
  akreditacija: { type: String },
  radnoIskustvo: { type: String },
  userName: { type: String },
  password: { type: String },
  klijenti: { type: [String] }
});

module.exports = { Instruktor };

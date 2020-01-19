const mongoose = require("mongoose");
var Vezba = mongoose.model("vezba", {
  ime: { type: String },
  misicnePartije: { type: [String] },
  vrsteTreninga: { type: [String] },
  tegovi: { type: String },
  masine: { type: String },
  bodyWeight: { type: String }
});

module.exports = { Vezba };

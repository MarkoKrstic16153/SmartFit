const mongoose = require("mongoose");
var planishrane = mongoose.model("planishrane", {
  usernameInstruktora: { type: String },
  usernameKlijenta: { type: String },
  dani: { type: JSON },
  naziv: { type: String },
  datum: { type: String }
});

module.exports = { planishrane };

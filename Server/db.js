const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/smartFit", err => {
  if (!err) console.log("MongoDB konekcija uspesna");
  else
    console.log(
      "Greska pri konekciji sa bazom: " + JSON.stringify(err, undefined, 2)
    );
});

module.exports = mongoose;

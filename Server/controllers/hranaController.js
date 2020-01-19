const express = require("express");
var router = express.Router();

var { Hrana } = require("../models/hrana");

//localhost:3000/hrana/lista

router.get("/getallhrana", (req, res) => {
  hrana.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Greska pri povlacenju hrane iz baze:" +
          JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.post("/posthrana", (req, res) => {
  var hrana = new Hrana({
    ime: req.body.ime,
    proteini: req.body.proteini,
    masti: req.body.masti,
    vlakna: req.body.vlakna,
    ugljeniHidrati: req.body.ugljeniHidrati
  });
  console.log(Hrana);
  hrana.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Greska pri pamcenju hrane:" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.get("/:ime", (req, res) => {
  hrana.findOne({ ime: req.params.ime }, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in Retriving hrana :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

module.exports = router;

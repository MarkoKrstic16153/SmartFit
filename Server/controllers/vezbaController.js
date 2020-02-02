const express = require("express");
var router = express.Router();

var { Vezba } = require("../models/vezba");

//localhost:3000/vezba/lista

router.get("/getallvezba", (req, res) => {
  Vezba.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Greska pri povlacenju vezbe iz baze:" +
          JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.post("/postvezba", (req, res) => {
  var vezba = new Vezba({
    ime: req.body.ime,
    vrsteTreninga: req.body.vrsteTreninga,
    misicnePartije: req.body.misicnePartije,
    tegovi: req.body.tegovi,
    masine: req.body.masine,
    bodyWeight: req.body.bodyWeight
  });
  console.log(Vezba);
  vezba.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Greska pri pamcenju vezba:" + JSON.stringify(err, undefined, 2)
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
        "Error in Retriving vezba :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.get("/checkvezba/:ime", (req, res) => {
  Vezba.findOne({ ime: req.params.ime }, (err, doc) => {
    if (!err) {
      if (doc == null) {
        res.send({ success: 1 });
        return;
      }
      res.send({ success: 0 });
    } else {
      console.log(
        "Greska pri povlacenju vezbe iz baze :" +
          JSON.stringify(err, undefined, 2)
      );
    }
  });
});

module.exports = router;

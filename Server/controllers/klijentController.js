const express = require("express");
var router = express.Router();

var { Klijent } = require("../models/klijent");

//localhost:3000/klijent/lista

router.get("/lista", (req, res) => {
  Klijent.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Greska pri povlacenju korisnika iz baze:" +
          JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.post("/", (req, res) => {
  var klijent = new Klijent({
    ime: req.body.ime,
    prezime: req.body.prezime,
    visina: req.body.visina,
    tezina: req.body.tezina,
    bodyFat: req.body.bodyFat,
    iskustvo: req.body.iskustvo,
    ciljVezbanja: req.body.ciljVezbanja,
    userName: req.body.userName,
    password: req.body.password
  });
  klijent.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Greska pri pamcenju klijenta:" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.get("/:username", (req, res) => {
  Klijent.findOne({ userName: req.params.username }, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in Retriving Employee :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

module.exports = router;

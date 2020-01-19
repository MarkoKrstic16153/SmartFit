const express = require("express");
var router = express.Router();

var { Instruktor } = require("../models/instruktor");

//localhost:3000/instruktor/lista

router.get("/lista", (req, res) => {
  Instruktor.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Greska pri povlacenju instruktora iz baze:" +
          JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.post("/signupinstruktor", (req, res) => {
  var instruktor = new Instruktor({
    ime: req.body.ime,
    prezime: req.body.prezime,
    akreditacija: req.body.akreditacija,
    radnoIskustvo: req.body.radnoIskustvo,
    userName: req.body.userName,
    password: req.body.password,
    klijenti: req.body.klijenti
  });
  console.log(instruktor);
  instruktor.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Greska pri pamcenju instruktor:" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.get("/:username", (req, res) => {
  Instruktor.findOne({ userName: req.params.username }, (err, doc) => {
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

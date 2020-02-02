const express = require("express");
var router = express.Router();

var { plantreninga } = require("../models/plantreninga");

//localhost:3000/plantreninga

router.post("/getall", (req, res) => {
  console.log(req.body);
  plantreninga.find(
    {
      usernameKlijenta: req.body.usernameKlijenta,
      usernameInstruktora: req.body.usernameInstruktora
    },
    (err, doc) => {
      if (!err) {
        var lista = [];
        doc.forEach(plan => {
          lista.push({ naziv: plan.naziv, datum: plan.datum });
        });
        res.send(lista);
      } else {
        console.log(
          "Greska pri povlacenju plana treninga iz baze:" +
            JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});

router.post("/getplan", (req, res) => {
  console.log(req.body);
  plantreninga.findOne(
    {
      usernameKlijenta: req.body.usernameKlijenta,
      usernameInstruktora: req.body.usernameInstruktora,
      naziv: req.body.naziv,
      datum: req.body.datum
    },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Greska pri povlacenju plana iz baze:" +
            JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});

router.post("/dodajplan", (req, res) => {
  console.log(req.body);
  var plan = new plantreninga({
    usernameInstruktora: req.body.usernameInstruktora,
    usernameKlijenta: req.body.usernameKlijenta,
    treninzi: req.body.treninzi,
    datum: req.body.datum,
    naziv: req.body.naziv
  });
  plan.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Greska pri pamcenju plana treninga:" +
          JSON.stringify(err, undefined, 2)
      );
    }
  });
});

module.exports = router;

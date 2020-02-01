const express = require("express");
var router = express.Router();

var { planishrane } = require("../models/planishrane");

//localhost:3000/planishrane

router.post("/getall", (req, res) => {
  console.log(req.body);
  planishrane.find(
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
          "Greska pri pamcenju instruktor:" + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});

router.post("/dodajplan", (req, res) => {
  console.log(req.body);
  var plan = new planishrane({
    usernameInstruktora: req.body.usernameInstruktora,
    usernameKlijenta: req.body.usernameKlijenta,
    dani: req.body.dani,
    datum: req.body.datum,
    naziv: req.body.naziv
  });
  plan.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Greska pri pamcenju plana ishrane:" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

module.exports = router;

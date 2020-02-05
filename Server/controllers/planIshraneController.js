const express = require("express");
var router = express.Router();

var { planIshrane } = require("../models/planishrane");

//localhost:3000/planishrane

router.post("/getall", (req, res) => {
  console.log(req.body);
  planIshrane.find(
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
          "Greska pri povlacenju plana iz baze:" +
            JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});

router.post("/getplan", (req, res) => {
  console.log(req.body);
  planIshrane.findOne(
    {
      usernameKlijenta: req.body.usernameKlijenta,
      // usernameInstruktora: req.body.usernameInstruktora,
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
  var plan = new planIshrane({
    usernameInstruktora: req.body.usernameInstruktora,
    usernameKlijenta: req.body.usernameKlijenta,
    dani: req.body.dani,
    datum: req.body.datum,
    naziv: req.body.naziv,
    komentari: req.body.komentari
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

router.post("/dodajkomentar", async (req, res) => {
  let odgovor = req.body.noviOdgovor;

  await planIshrane.findOne(
    {
      usernameKlijenta: req.body.usernameKlijenta,
      usernameInstruktora: req.body.userNameInstruktora,
      naziv: req.body.naziv,
      datum: req.body.datum
    },
    (err, doc) => {
      var planishrane = {
        _id: doc._id,
        usernameInstruktora: doc.usernameInstruktora,
        usernameKlijenta: doc.usernameKlijenta,
        naziv: doc.naziv,
        dani: doc.dani,
        datum: doc.datum,
        plan: doc.plan,
        komentari: doc.komentari
      };

      if (!err) {
        planishrane.komentari.push(odgovor);

        planIshrane.findByIdAndUpdate(
          planishrane._id,
          { $set: planishrane },
          {
            new: true,
            useFindAndModify: false
          },
          (err, doc) => {
            if (!err) {
              res.send(doc);
            } else {
              console.log(
                "Greska pri update-ovanju plana :" +
                  JSON.stringify(err, undefined, 2)
              );
            }
          }
        );
      } else {
        console.log(
          "Greska pri update-ovanju plana :" + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});

module.exports = router;

const express = require("express");
var router = express.Router();

var { planTreninga } = require("../models/plantreninga");

//localhost:3000/plantreninga

router.post("/getall", (req, res) => {
  console.log(req.body);
  planTreninga.find(
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
  planTreninga.findOne(
    {
      usernameKlijenta: req.body.usernameKlijenta,
      //usernameInstruktora: req.body.usernameInstruktora,
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
  var plan = new planTreninga({
    usernameInstruktora: req.body.usernameInstruktora,
    usernameKlijenta: req.body.usernameKlijenta,
    treninzi: req.body.treninzi,
    datum: req.body.datum,
    naziv: req.body.naziv,
    komentari: req.body.komentari
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

router.post("/dodajkomentar", async (req, res) => {
  let odgovor = req.body.noviOdgovor;

  await planTreninga.findOne(
    {
      usernameKlijenta: req.body.usernameKlijenta,
      usernameInstruktora: req.body.userNameInstruktora,
      naziv: req.body.naziv,
      datum: req.body.datum
    },
    (err, doc) => {
      var plantreninga = {
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
        plantreninga.komentari.push(odgovor);

        planTreninga.findByIdAndUpdate(
          plantreninga._id,
          { $set: plantreninga },
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

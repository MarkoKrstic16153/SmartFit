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

router.post("/signupklijent", (req, res) => {
  var klijent = new Klijent({
    ime: req.body.ime,
    prezime: req.body.prezime,
    visina: req.body.visina,
    tezina: req.body.tezina,
    bodyFat: req.body.bodyFat,
    iskustvo: req.body.iskustvo,
    ciljVezbanja: req.body.ciljVezbanja,
    userName: req.body.userName,
    password: req.body.password,
    instruktori: req.body.instruktori
  });
  console.log(klijent);
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
        "Greska pri povlacenju klijenta iz baze :" +
          JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.get("/loginklijent/:username", (req, res) => {
  Klijent.findOne({ userName: req.params.username }, (err, doc) => {
    if (!err) {
      if (doc == null) {
        res.send({ password: 0 });
        return;
      }
      res.send({ password: 1 });
    } else {
      console.log(
        "Greska pri povlacenju klijenta iz baze :" +
          JSON.stringify(err, undefined, 2) +
          JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.post("/logklijent", (req, res) => {
  console.log(req.body);
  Klijent.findOne(
    { userName: req.body.userName, password: req.body.password },
    (err, doc) => {
      if (!err) {
        if (doc == null) {
          res.send({ success: 0 });
          return;
        }
        res.send({ success: 1 });
      } else {
        console.log(
          "Greska pri logovanju klijenta:" + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});

router.put("/updateklijent/:username", (req, res) => {
  var klijent = {
    ime: req.body.ime,
    prezime: req.body.prezime,
    visina: req.body.visina,
    tezina: req.body.tezina,
    bodyFat: req.body.bodyFat,
    iskustvo: req.body.iskustvo,
    ciljVezbanja: req.body.ciljVezbanja,
    userName: req.body.userName,
    password: req.body.password,
    instruktori: req.body.instruktori
  };
  Klijent.findOneAndUpdate(
    { userName: req.params.username },
    { $set: klijent },
    {
      new: true,
      useFindAndModify: false
    },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Greska pri update-ovanju klijenta :" +
            JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});

module.exports = router;

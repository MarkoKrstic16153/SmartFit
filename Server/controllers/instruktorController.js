const express = require("express");
var router = express.Router();

var { Instruktor } = require("../models/instruktor");

//localhost:3000/instruktor/lista

router.get("/getallinstruktor", (req, res) => {
  Instruktor.find((err, docs) => {
    if (!err) {
      var lista = [];
      docs.forEach(instruktor => {
        lista.push(instruktor.userName);
      });
      res.send(lista);
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

router.get("/logininstruktor/:username", (req, res) => {
  Instruktor.findOne({ userName: req.params.username }, (err, doc) => {
    if (!err) {
      if (doc == null) {
        res.send({ password: 0 });
        return;
      }
      res.send({ password: 1 });
    } else {
      console.log(
        "Error in Retriving Employee :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.post("/loginstruktor", (req, res) => {
  console.log(req.body);
  Instruktor.findOne(
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
          "Greska pri pamcenju instruktor:" + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});

router.put("/updateinstruktor", (req, res) => {
  var instruktor = {
    ime: req.body.ime,
    prezime: req.body.prezime,
    akreditacija: req.body.akreditacija,
    radnoIskustvo: req.body.radnoIskustvo,
    userName: req.body.userName,
    password: req.body.password,
    klijenti: req.body.klijenti
  };
  Instruktor.findOneAndUpdate(
    { userName: req.body.userName },
    { $set: instruktor },
    {
      new: true,
      useFindAndModify: false
    },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Greska pri update-ovanju instruktora :" +
            JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});

router.put("/updatelistaklijenata", (req, res) => {
  var instruktor = {
    ime: req.body.ime,
    prezime: req.body.prezime,
    akreditacija: req.body.akreditacija,
    radnoIskustvo: req.body.radnoIskustvo,
    userName: req.body.userName,
    password: req.body.password,
    klijenti: req.body.klijenti
  };
  Instruktor.findOneAndUpdate(
    { userName: req.body.userName },
    { $set: instruktor },
    {
      new: true,
      useFindAndModify: false
    },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Greska pri update-ovanju instruktora :" +
            JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});

router.post("/updatelistaklijenata", async (req, res) => {
  let mode = req.body.tip;
  let klijentUsername = req.body.usernameKlijent;
  await Instruktor.findOne(
    { userName: req.body.usernameInstruktor },
    (err, doc) => {
      var instruktor = {
        _id: doc._id,
        ime: doc.ime,
        prezime: doc.prezime,
        akreditacija: doc.akreditacija,
        radnoIskustvo: doc.radnoIskustvo,
        userName: doc.userName,
        password: doc.password,
        klijenti: doc.klijenti
      };

      if (!err) {
        if (mode == 0) {
          const index = instruktor.klijenti.indexOf(klijentUsername);
          if (index > -1) {
            instruktor.klijenti.splice(index, 1);
          }
        } else {
          instruktor.klijenti.push(klijentUsername);
        }

        console.log(instruktor.klijenti);

        Instruktor.findByIdAndUpdate(
          instruktor._id,
          { $set: instruktor },
          {
            new: true,
            useFindAndModify: false
          },
          (err, doc) => {
            if (!err) {
              res.send(doc);
            } else {
              console.log(
                "Greska pri update-ovanju instruktora :" +
                  JSON.stringify(err, undefined, 2)
              );
            }
          }
        );
      } else {
        console.log(
          "Greska pri update-ovanju instruktora :" +
            JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});

module.exports = router;

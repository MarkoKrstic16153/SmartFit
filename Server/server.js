var express = require("express");
//var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");

var app = express();

var { mongoose } = require("./db.js");

//const route = require("./routes/route");
var klijentController = require("./controllers/klijentController.js");
var instruktorController = require("./controllers/instruktorController.js");
var hranaController = require("./controllers/hranaController.js");
var vezbaController = require("./controllers/vezbaController.js");

const port = 3000;

app.use(cors());

app.use(bodyparser.json());

//app.use(express.static(path.join(__dirname, "public")));

//app.use("/api", route);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log("Server startovan na portu:" + port);
});

app.use("/klijent", klijentController);
app.use("/instruktor", instruktorController);
app.use("/hrana", hranaController);
app.use("/vezba", vezbaController);

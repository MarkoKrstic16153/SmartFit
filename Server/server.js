var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");

var app = express();

//const route = require("./routes/route");

//mongoose.connect("mongodb://localhost:27017/contactlist");

/*mongoose.connection.on("connected", () => {
  console.log("povezan sa bazom");
});

mongoose.connection.on("error", err => {
  if (err) {
    console.log("greska prilikom povezivanja sa bazom");
  }
});*/

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

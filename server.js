const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const articles = require("./articles");
const users = require("./users");

const port = 3001;

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, World");
});
app.use("/articles", articles);
app.use("/users", users);
app.use("/public", express.static("public"));

app.listen(port, "localhost", function (err) {
  if (err) {
    console.log(err);
    return;
  }
});

const express = require("express");
const api = require("./api");
const bodyParser = require("body-parser");
const port = 3001;

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(bodyParser.json());
app.use("/api", api);
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello, World");
});

app.listen(port, "localhost", function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Listening at http://localhost:" + port);
});

const express = require("express");
var fs = require("fs");
const https = require("https");
const app = express();
const cors = require("cors");

const articles = require("./articles");
const users = require("./users");
const weapons = require("./weapons");

app.use(cors({ origin: true }));
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, World");
});
app.use("/articles", articles);
app.use("/users", users);
app.use("/weapons", weapons);
app.use("/public", express.static("public"));

// const options = {
//   cert: fs.readFileSync("./sslcert/fullchain.pem"),
//   key: fs.readFileSync("./sslcert/privkey.pem"),
// };

app.listen(8080);
// https.createServer(options, app).listen(8080);

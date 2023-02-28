const router = require("express").Router();
const { articles } = require("./mock");
const { reply } = require("./utils.js");

router.get("/", (req, res, next) => {
  reply(res, articles);
});

module.exports = router;
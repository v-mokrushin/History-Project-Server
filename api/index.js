const router = require("express").Router();
const { articles } = require("./mock");
const { reply } = require("./utils.js");

router.get("/articles", (req, res, next) => {
  reply(res, articles);
});

module.exports = router;
const router = require("express").Router();
const { userAccounts } = require("./user-accounts");

router.post("/", (request, response, next) => {
  const user = userAccounts.login(
    request.body.username,
    request.body.passwordHash
  );

  setTimeout(() => {
    if (!user) response.status(404).send("Неверный пароль или логин");
    response.status(200).send(user);
  }, 500);
});

module.exports = router;

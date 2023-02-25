const router = require("express").Router();
const { userAccounts } = require("./user-accounts");

router.post("/", (request, response, next) => {
  setTimeout(() => {
    const user = userAccounts.login(
      request.body.username,
      request.body.password
    );

    if (user === undefined)
      response.status(404).send("Такой пользователь не зарегистрирован");
    else if (user === null) response.status(404).send("Неверный пароль");
    else if (user) response.status(200).send(user);
  }, 500);
});

router.patch("/", (request, response, next) => {
  setTimeout(() => {
    const req = request.body;
    const operationStatus = userAccounts.updateUserInfo(
      req.id,
      req.name,
      req.surname,
      req.avatar
    );
    if (operationStatus) response.status(200).send();
    else response.status(400).send("Неудалось обновить данные");
  }, 500);
});

router.post("/registration", (request, response, next) => {
  setTimeout(() => {
    if (!userAccounts.doesUserExist(request.body.username)) {
      const newAccount = userAccounts.registrate(
        request.body.username,
        request.body.password
      );
      response.status(201).send(newAccount);
    } else {
      response.status(409).send("Позьзователь с таким ником уже существует");
    }
  }, 1200);
});

module.exports = router;

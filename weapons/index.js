const router = require("express").Router();

class CreatedWeapons {
  data = [];

  add(createdWeapon) {
    this.data.push(createdWeapon);
  }

  get() {
    return this.data;
  }
}

const createdWeaponsData = new CreatedWeapons();

// --------------------------------------------------------------

router.get("/", (request, response, next) => {
  setTimeout(() => {
    response.status(200).send(createdWeaponsData.get());
  }, 1000);
});

router.post("/", (request, response, next) => {
  setTimeout(() => {
    createdWeaponsData.add(request.body.createdWeapon);
    response.status(200).send(createdWeaponsData.get());
  }, 2000); 
});

module.exports = router;

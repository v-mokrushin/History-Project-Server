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

class Views {
  records = [
    { articleId: "ИС-2", views: 101 },
    { articleId: "Як-3", views: 56 },
  ];

  add(id) {
    const existingRecord = this.records.find((item) => item.articleId === id);

    if (existingRecord) {
      existingRecord.views++;
      return existingRecord;
    } else {
      const newRecord = { articleId: id, views: 1 };
      this.records.push({ articleId: id, views: 1 });
      return newRecord;
    }
  }

  get(id) {
    return this.records;
  }
}

const views = new Views();

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

router.post("/views/add", (request, response, next) => {
  setTimeout(() => {
    response.status(200).send(views.add(request.body.id));
  }, 300);
});

router.post("/views/get", (request, response, next) => {
  // setTimeout(() => {
  //   // response.status(200).send(views.add(request.body.id));
  // }, 1000);
  setTimeout(() => {
    response.status(200).send(views.get());
  }, 1000);
});

module.exports = router;

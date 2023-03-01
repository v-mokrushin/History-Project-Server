const router = require("express").Router();

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

router.post("/add", (request, response, next) => {
  setTimeout(() => {
    response.status(200).send(views.add(request.body.id));
  }, 300);
});

router.post("/get", (request, response, next) => {
  setTimeout(() => {
    response.status(200).send(views.get());
  }, 1000);
});

module.exports = router;

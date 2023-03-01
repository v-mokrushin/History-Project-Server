const router = require("express").Router();
const { userAccounts } = require("../users/user-accounts");
const { getUniqueId } = require("../utils");

class Comments {
  records = [
    {
      id: getUniqueId(),
      articleId: "ИС-2",
      userId: "0003",
      text: `Zweimal haben wir in den Weltkriegen verloren, zweimal haben wir unser Generalstab als Sieger aufgelöst. Diese Handlungen der Siegerländer sprechen für ihren unfreiwilligen Respekt vor dieser großartigen militärischen Behörde. "Wir sind still geblieben."`,
      date: new Date(1951, 6, 15, 19, 45),
    },
    {
      id: getUniqueId(),
      articleId: "ИС-2",
      userId: "0001",
      text: `Надо признать также, что определенную долю ответственности за недостатки в подготовке вооруженных сил к началу военных действий несут нарком обороны и ответственные работники Наркомата обороны. Как бывший начальник Генерального штаба и ближайший помощник наркома, не могу снять с себя вины за эти недостатки и я.
      `,
      date: new Date(1966, 8, 12, 13, 31),
    },
    {
      id: getUniqueId(),
      articleId: "ИС-2",
      userId: "0002",
      text: "Общая широкая картина войны может сложиться только из многих воспоминаний. Её составят воспоминания командующих фронтами и армиями, командиров дивизий и полков, комбатов, командиров рот, младших командиров и солдат. Только всё это, вместе взятое, может дать полное представление о войне, увиденной с разных точек. ",
      date: new Date(1963, 2, 1, 2, 30),
    },
    {
      id: getUniqueId(),
      articleId: "Як-3",
      userId: "0001",
      text: "Отличный самолет!",
      date: new Date(),
    },
  ];

  constructor() {
    this.records.reverse();
  }

  getByArticleId(articleId) {
    const records = this.records
      .filter((record) => record.articleId === articleId)
      .map((record) => Object.assign({}, record));

    records.forEach((comment) => {
      const user = userAccounts.getById(comment.userId);
      comment.avatar = user.avatar;
      comment.username = user.username;
      comment.articleId = undefined;
    });

    return records;
  }

  add(articleId, userId, text) {
    const newComment = {
      id: getUniqueId(),
      articleId,
      userId,
      text,
      date: new Date(),
    };

    this.records.unshift(newComment);

    return newComment; 
  }
}

const comments = new Comments();

// --------------------------------------------------------------

router.post("/get", (request, response, next) => {
  setTimeout(() => {
    response.status(200).send(comments.getByArticleId(request.body.id));
  }, 1000);
});

router.post("/add", (request, response, next) => {
  setTimeout(() => {
    const req = request.body;
    const newCommentData = comments.add(req.articleId, req.userId, req.text);
    response.status(200).send(newCommentData);
  }, 300);
});

module.exports = router;

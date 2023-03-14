const { comments } = require("./comments");

const router = require("express").Router();

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

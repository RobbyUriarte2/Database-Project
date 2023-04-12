module.exports = app => {
  const comment = require("../controllers/comment.controller.js");

  var router = require("express").Router();

  router.post("/", comment.create);

  router.post("/eventcomments", comment.EventComment);

  router.get("/usercomments", comment.UserComments);

  router.post("/update", comment.update);

  router.delete("/delete", comment.delete);

  app.use('/api/comment', router);
};
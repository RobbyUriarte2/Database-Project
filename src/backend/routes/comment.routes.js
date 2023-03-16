module.exports = app => {
  const comment = require("../controllers/comment.controller.js");

  var router = require("express").Router();

  router.post("/", comment.create);

  app.use('/api/comment', router);
};
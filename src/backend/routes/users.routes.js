module.exports = app => {
  const user = require("../controllers/users.controller.js");

  var router = require("express").Router();

  router.post("/", user.create);

  app.use('/api/user', router);
};
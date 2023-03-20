module.exports = app => {
  const user = require("../controllers/users.controller.js");

  var router = require("express").Router();

  router.post("/", user.create);

  router.post("/login", user.login);

  router.put("/update", user.update);

  router.delete("/delete", user.delete);

  app.use('/api/user', router);
};
module.exports = app => {
  const rso = require("../controllers/rso.controller.js");

  var router = require("express").Router();

  router.post("/", rso.create);

  router.post("/addUser", rso.addUser)

  app.use('/api/rso', router);
};
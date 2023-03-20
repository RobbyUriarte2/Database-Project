module.exports = app => {
  const university = require("../controllers/university.controller.js");

  var router = require("express").Router();

  router.post("/", university.create);

  router.post("/getall", university.getAll);

  router.post("/getallnoadmin", university.getAllNoAdmin);

  app.use('/api/university', router);
};
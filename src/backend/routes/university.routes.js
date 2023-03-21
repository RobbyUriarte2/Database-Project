module.exports = app => {
  const university = require("../controllers/university.controller.js");

  var router = require("express").Router();

  router.post("/", university.create);

  router.get("/getall", university.getAll);

  router.get("/getallnoadmin", university.getAllNoAdmin);

  app.use('/api/university', router);
};
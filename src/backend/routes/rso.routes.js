module.exports = app => {
  const rso = require("../controllers/rso.controller.js");

  var router = require("express").Router();

  router.post("/", rso.create);

  router.post("/addUser", rso.addUser);

  router.get("/all", rso.getAll);

  router.post("/university", rso.getUniversity);

  router.put("/update", rso.update);

  router.delete("/delete", rso.delete);

  router.delete("/deleteUser", rso.delete);

  app.use('/api/rso', router);
};
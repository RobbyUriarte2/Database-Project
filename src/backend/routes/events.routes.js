module.exports = app => {
  const event = require("../controllers/events.controller.js");

  var router = require("express").Router();

  router.post("/", event.create);

  app.use('/api/events', router);
};
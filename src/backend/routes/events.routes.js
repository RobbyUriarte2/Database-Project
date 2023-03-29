module.exports = app => {
  const event = require("../controllers/events.controller.js");

  var router = require("express").Router();

  router.post("/public", event.createPublic);

  router.post("/private", event.createPrivate);

  router.post("/rso", event.createRSO);

  router.get("/", event.getAll);

  router.get("/event", event.getEvent);

  router.post("/allPrivate", event.getPrivate);

  router.post("/notVerifiedPrivate", event.getPrivateNotVerified);

  router.get("/allPublic", event.getPublic);

  router.post("/notVerifiedPublic", event.getPublicNotVerified);

  router.post("/getRsos", event.getRSO);

  router.post("/verify", event.verifyEvent);

  app.use('/api/events', router);
};
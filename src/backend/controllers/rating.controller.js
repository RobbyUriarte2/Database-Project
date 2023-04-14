const ratingObj = require("../models/rating.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a comment
    const newRating = new ratingObj({
      ratingID:null,
      eventID:req.body.eventID,
      userID:req.body.userID,
      rating:req.body.rating
    });
  
    ratingObj.create(newRating, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else res.send(data);
    });


  };



  exports.EventRating = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    ratingObj.getEventRatings(req.body.eventID, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else res.send(data);
    });


  };



  exports.UserRatings = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    ratingObj.getUserRatings(req.body.userID, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else res.send(data);
    });
  };

  exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const newRating = new ratingObj({
      ratingID:req.body.ratingID,
      eventID:req.body.eventID,
      userID:req.body.userID,
      rating:req.body.rating
    });

    ratingObj.update(newRating, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else res.send(data);
    });
  };



  exports.delete = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    ratingObj.delete(req.body.ratingID, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else res.send(data);
    });
  };


  exports.UserEventRatings = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    ratingObj.getAllUserEventRatings(req.body.userID, req.body.eventID, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else res.send(data);
    });
  };

  

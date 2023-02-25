const Event = require("../models/events.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Event
    const event = new Event({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published || false
    });
  
    // Save Event in the database
    Event.create(event, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else res.send(data);
    });
  };
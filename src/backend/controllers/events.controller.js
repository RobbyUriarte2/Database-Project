const Event = require("../models/events.model.js");

exports.createPublic = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Event
    const event = new Event({
      universityID: req.body.universityID,
      userID:req.body.userID,
      category:req.body.category,
      name:req.body.name,
      latitude:req.body.latitude,
      longitude:req.body.longitude,
      verified:false,
      eventStart:req.body.eventStart,
      eventEnd:req.body.eventEnd,
      contactPhone:req.body.contactPhone,
      email:req.body.email,
      description:req.body.description
    });
  
    // Save Event in the database
    Event.createEvent(event, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else 
      {
        Event.createPublic(data.id, data.userID, data.universityID, data, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Event."
            });
          else 
          {
            res.send(data);
          }
        });
        
      }
    });
  };
  
  exports.createPrivate = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Event
    const event = new Event({
      universityID: req.body.universityID,
      userID:req.body.userID,
      category:req.body.category,
      name:req.body.name,
      latitude:req.body.latitude,
      longitude:req.body.longitude,
      verified:false,
      eventStart:req.body.eventStart,
      eventEnd:req.body.eventEnd,
      contactPhone:req.body.contactPhone,
      email:req.body.email,
      description:req.body.description
    });
  
    // Save Event in the database
    Event.createEvent(event, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else
      {
        Event.createPrivate(data.id, data.userID, data.universityID, data, (err, data) => {
          if (err)
          {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Event."
            });
          }
          else 
          {
            res.send(data);
          }
        });
      }
    });
  };

  exports.createRSO = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Event
    const event = new Event({
      universityID: req.body.universityID,
      userID:req.body.userID,
      category:req.body.category,
      name:req.body.name,
      latitude:req.body.latitude,
      longitude:req.body.longitude,
      verified:false,
      eventStart:req.body.eventStart,
      eventEnd:req.body.eventEnd,
      contactPhone:req.body.contactPhone,
      email:req.body.email,
      description:req.body.description
    });
  
    // Save Event in the database
    Event.createEvent(event, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else
      {
        Event.createRSO(data.id, data.userID, req.body.rsoID, data, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Event."
            });
          else 
          {
            res.send(data);
          }
        });
      }
    });
  };



  exports.getAll = (req, res) => { 
    // Save Event in the database
    Event.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else res.send(data);
    });
  };

  exports.getPrivate = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Save Event in the database
    Event.getAllPrivateEvents(req.body.universityID, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else res.send(data);
    });
  };

  exports.getPrivateNotVerified = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Save Event in the database
    Event.getAllPrivateEventsNotVerified(req.body.universityID, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else res.send(data);
    });
  };

  exports.getPublic = (req, res) => {

    // Save Event in the database
    Event.getAllPublicEvents((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else res.send(data);
    });
  };

  exports.getPublicNotVerified = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Save Event in the database
    Event.getAllPublicEventsNotVerified(req.body.universityID, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else res.send(data);
    });
  };

  exports.getRSO = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Save Event in the database
    Event.getAllRSOEvents(req.body.userID, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else res.send(data);
    });
  };

  exports.getEvent = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Save Event in the database
    Event.getEvent(req.body.eventID, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else res.send(data);
    });
  };

  exports.verifyEvent = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Save Event in the database
    Event.verifyEvent(req.body.eventID, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else res.send(data);
    });
  };



  

  



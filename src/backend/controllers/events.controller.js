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
      if(err.message == "No two events can happen at the same time and place")
      {
        //make events do that search and then send back the time and place that messed it up
        Event.betterErrorLog(event, (err, data) => {
          if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Event."
          });
          else res.status(500).send({message: `No two events are allowed at the same location at the same time. Error occured at event called: '${data.ress[0].name}' with location of latitude: '${data.ress[0].latitude}' and longitude: '${data.ress[0].longitude}' starting at: '${data.ress[0].eventStart}' and ending at: '${data.ress[0].eventEnd}'`});
        });
      }
      else
      {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      }
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
        if(err.message == "No two events can happen at the same time and place")
        {
          //make events do that search and then send back the time and place that messed it up
          Event.betterErrorLog(event, (err, data) => {
            if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Event."
            });
            else res.status(500).send({message: `No two events are allowed at the same location at the same time. Error occured at event called: '${data.ress[0].name}' with location of latitude: '${data.ress[0].latitude}' and longitude: '${data.ress[0].longitude}' starting at: '${data.ress[0].eventStart}' and ending at: '${data.ress[0].eventEnd}'`});
          });
        }
        else
        {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Event."
          });
        }
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
      verified: true,
      eventStart:req.body.eventStart,
      eventEnd:req.body.eventEnd,
      contactPhone:req.body.contactPhone,
      email:req.body.email,
      description:req.body.description
    });

    Event.checkRSOAdminStatus(event.userID, req.body.rsoID, (err, data) => {
      if(data.status)
      {
        Event.createEvent(event, (err, data) => {
          if (err)
          {
            if(err.message == "No two events can happen at the same time and place")
            {
            //make events do that search and then send back the time and place that messed it up
              Event.betterErrorLog(event, (err, data) => {
                console.log(data)
                if (err)
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while creating the Event."
                });
              else res.status(500).send({message: `No two events are allowed at the same location at the same time. Error occured at event called: '${data.ress[0].name}' with location of latitude: '${data.ress[0].latitude}' and longitude: '${data.ress[0].longitude}' starting at: '${data.ress[0].eventStart}' and ending at: '${data.ress[0].eventEnd}'`});
              });
            }
            else
            {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Event."
              });
            }
          }
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
      }
      else
      {
        res.status(500).send({
          message: "The user is not an admin for the specified RSO"
        });
      }
      
    });
  
    // Save Event in the database
    
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



  

  



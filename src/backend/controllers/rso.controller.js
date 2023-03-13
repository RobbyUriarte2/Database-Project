const RSO = require("../models/rso.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a University
    const newRSO = new RSO({
      universityID:req.body.universityID,
      NameRSO:req.body.NameRSO,
      DescriptionRSO:req.body.DescriptionRSO,
      verified:false
    });
  
    RSO.create(newRSO, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else res.send(data);
    });


  };



  exports.addUser = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    
    //might need to check for injections here, make sure what they send in is a valid string

    RSO.addUser(req.body.rsoID, req.body.userID, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else res.send(data);
    });


  };
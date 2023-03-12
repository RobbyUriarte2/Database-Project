const University = require("../models/university.model.js");
const User = require("../models/university.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a University
    const university = new University({
      nameUniversity:req.body.nameUniversity,
      latitude:req.body.latitude,
      longitude:req.body.longitude,
      emailDomain:req.body.emailDomain,
    });
  
    // Save Event in the database
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else res.send(data);
    });
  };
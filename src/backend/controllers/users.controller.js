const User = require("../models/users.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a User
    const user = new User({
      userID:req.body.userID,
      email:req.body.email,
      password:req.body.password,
      permission:"student",
      salt:"secretsaltforhashinglater",
      universityID:req.body.universityID
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


  exports.login = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Save Event in the database
    User.login(req.body.email, req.body.password, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else
      {
        User.CheckAdmin(data, (err, data1) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Event."
            });
            else res.send(data1);
          });
      }
    });
  };

  exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const user = new User({
      userID:req.body.userID,
      email:req.body.email,
      password:req.body.password,
      permission:"student",
      salt:"secretsaltforhashinglater",
      universityID:req.body.universityID
    });

  
    // Save Event in the database
    User.update(user, (err, data) => {
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

  
    // Save Event in the database
    User.delete(req.body.userID, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else res.send(data);
    });
  };

  exports.get = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

  
    // Save Event in the database
    User.get(req.body.userID, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else res.send(data);
    });
  };

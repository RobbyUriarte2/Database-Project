const commentObj = require("../models/comment.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a comment
    const newComment = new commentObj({
      commentID:null,
      eventID:req.body.eventID,
      userID:req.body.userID,
      comment:req.body.comment
    });
  
    commentObj.create(newComment, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Event."
        });
      else res.send(data);
    });


  };

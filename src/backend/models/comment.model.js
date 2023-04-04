const sql = require("./db.js");

// constructor
const commentObj = function(commentObj) {
  this.commentID = commentObj.commentID;
  this.eventID = commentObj.eventID;
  this.userID = commentObj.userID;
  this.comment = commentObj.comment;
};

commentObj.create = async (newComment, result) => {
  await sql.then((database) => {
    database.query("INSERT INTO comments SET ?", newComment, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created comment: ", { commentID: res.insertId, ...newComment });
      result(null, { commentID: res.insertId, ...newComment });
    });
  }).catch((err) => {
    console.log(err);
  });
};

commentObj.getEventComments = async (eventID, result) => {
  await sql.then((database) => {
    database.query(`SELECT * FROM comments WHERE comments.eventID = '${eventID}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("All comments from the event ", { res });
      result(null, { res });
    });
  }).catch((err) => {
    console.log(err);
  });
};


commentObj.getUserComments = async (userID, result) => {
  await sql.then((database) => {
    database.query("SELECT * FROM comments R WHERE R.userID = ?", userID, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("All comments from the user ", { res });
      result(null, { res });
    });
  }).catch((err) => {
    console.log(err);
  });
};

commentObj.delete = async (commentID, result) => {
  await sql.then((database) => {
    database.query("DELETE FROM comments WHERE commentID = ?", commentID, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("Deleted rating with commentID", commentID);
      result(null, {commentID:commentID});
    });
  }).catch((err) => {
    console.log(err);
  });
};

commentObj.update = async (newComment, result) => {
  await sql.then((database) => {
    database.query("UPDATE comments SET ? WHERE commentID = ?", newComment, newComment.commentID, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      
      console.log("Updated rating with commentID", newComment.commentID);
      result(null, newComment);
    });
  }).catch((err) => {
    console.log(err);
  });
};

module.exports = commentObj;
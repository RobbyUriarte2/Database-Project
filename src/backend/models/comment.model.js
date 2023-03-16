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

module.exports = commentObj;
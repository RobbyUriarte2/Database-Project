const sql = require("./db.js");

// constructor
const ratingObj = function(ratingObj) {
  this.ratingID = ratingObj.ratingID;
  this.eventID = ratingObj.eventID;
  this.userID = ratingObj.userID;
  this.rating = ratingObj.rating;
};

ratingObj.create = async (newRating, result) => {
  await sql.then((database) => {
    database.query("INSERT INTO ratings SET ?", newRating, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created comment: ", { ratingID: res.insertId, ...newRating });
      result(null, { ratingID: res.insertId, ...newRating });
    });
  }).catch((err) => {
    console.log(err);
  });
};


ratingObj.getEventRatings = async (eventID, result) => {
  await sql.then((database) => {
    database.query("SELECT * FROM ratings R WHERE R.eventID = ?", eventID, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("All ratings from the event ", { res });
      result(null, { res });
    });
  }).catch((err) => {
    console.log(err);
  });
};


ratingObj.getUserRatings = async (userID, result) => {
  await sql.then((database) => {
    database.query("SELECT * FROM ratings R WHERE R.userID = ?", userID, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("All ratings from the user ", { res });
      result(null, { res });
    });
  }).catch((err) => {
    console.log(err);
  });
};

ratingObj.delete = async (ratingID, result) => {
  await sql.then((database) => {
    database.query("DELETE FROM ratings WHERE ratingID = ?", ratingID, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("Deleted rating with ratingID", ratingID);
      result(null, {ratingID:ratingID});
    });
  }).catch((err) => {
    console.log(err);
  });
};

ratingObj.update = async (newRating, result) => {
  await sql.then((database) => {
    database.query(`UPDATE ratings SET ? WHERE ratingID = '${newRating.ratingID}'`, newRating, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      
      console.log("Updated rating with ratingID", newRating.ratingID);
      result(null, newRating);
    });
  }).catch((err) => {
    console.log(err);
  });
};


ratingObj.getAllUserEventRatings = async (userID, eventID, result) => {
  await sql.then((database) => {
    database.query(`SELECT * FROM ratings WHERE ratings.userID = '${userID}' AND ratings.eventID = '${eventID}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
    
      result(null, {res});
    });
  }).catch((err) => {
    console.log(err);
  });
};



module.exports = ratingObj;
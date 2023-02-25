const sql = require("./db.js");

// constructor
const Event = function(Event) {
  this.eventID = Event.eventID;
  this.universityID = Event.universityID;
  this.userID = Event.userID;
};

Event.create = (newEvent, result) => {
  sql.query("INSERT INTO event SET ?", newEvent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created event: ", { id: res.insertId, ...newEvent });
    result(null, { id: res.insertId, ...newEvent });
  });
};
module.exports = Event;
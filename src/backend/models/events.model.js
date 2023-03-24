const sql = require("./db.js");

// constructor
const Event = function(Event) {
  this.eventID = Event.eventID;
  this.universityID = Event.universityID;
  this.userID = Event.userID;
  this.category = Event.category;
  this.name = Event.name;
  this.latitude = Event.latitude;
  this.longitude = Event.longitude;
  this.verified = Event.verified;
};

Event.createPublic = (newEvent, result) => {
  var insertId;
  sql.query("INSERT INTO event SET ?", newEvent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created event: ", { id: res.insertId, ...newEvent });
    insertId = res.insertId;
  });

  var superadminID;
  sql.query("SELECT DISTINCT users.userID from users where permission = 'superadmin' AND universityID =  ?", newEvent.universityID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    superadminID = res.userID;
  });

  sql.query("INSERT INTO publicEvent (eventID, adminID, superadminID) VALUES (?,?,?)", insertID, newEvent.userID, superadminID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
  });

  result(null, { id: res.insertId, ...newEvent })
};

Event.createPrivate = (newEvent, result) => {
  var insertId;
  sql.query("INSERT INTO event SET ?", newEvent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created event: ", { id: res.insertId, ...newEvent });
    insertId = res.insertId;
  });

  var superadminID;
  sql.query("SELECT DISTINCT users.userID from users where permission = 'superadmin' AND universityID =  ?", newEvent.universityID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    superadminID = res.userID;
  });

  sql.query("INSERT INTO privateEvent (eventID, adminID, superadminID) VALUES (?,?,?)", insertID, newEvent.userID, superadminID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
  });
  result(null, { id: res.insertId, ...newEvent })
};

Event.createRSO = (newEvent, rsoID, result) => {
  var insertId;
  sql.query("INSERT INTO event SET ?", newEvent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created event: ", { id: res.insertId, ...newEvent });
    insertId = res.insertId;
  });

  sql.query("INSERT INTO rsoEvent (eventID, adminID, rsoID) VALUES (?,?,?)", insertID, newEvent.userID, rsoID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
  });
  result(null, { id: res.insertId, ...newEvent })
};

Event.getAll = (result) => {
  sql.query("SELECT event.eventID, event.universityID, event.userID, event.name, event.latitude, event.longitude, privateEvent.adminID AS privateAdmin, privateEvent.superadminID as privateSuperAdmin, rsoEvent.adminID as rsoAdmin, rsoEvent.rsoID, publicEvent.adminID as publicAdmin, publicEvent.superadminID as publicSuperAdmin FROM event LEFT JOIN privateEvent on event.eventID = privateEvent.eventID LEFT JOIN rsoEvent on event.eventID = rsoEvent.eventID LEFT JOIN publicEvent on event.eventID = publicEvent.eventID", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("All events: ", { res });
    result(null, { res });
  });
};

Event.getAllPrivateEvents = (result) => {
  sql.query("SELECT event.eventID, event.universityID, event.userID, event.category, event.name, event.latitude, event.longitude, event.verified, privateEvent.adminID, privateEvent.superadminID FROM event inner join privateEvent", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("All events: ", { res });
    result(null, { res });
  });
};

Event.getAllPrivateEventsNotVerified = (result) => {
  sql.query("SELECT event.eventID, event.universityID, event.userID, event.category, event.name, event.latitude, event.longitude, event.verified, privateEvent.adminID, privateEvent.superadminID FROM event inner join privateEvent WHERE event.verified = 0", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("All events: ", { res });
    result(null, { res });
  });
};

Event.getAllPublicEvents = (result) => {
  sql.query("SELECT event.eventID, event.universityID, event.userID, event.category, event.name, event.latitude, event.longitude, event.verified, publicEvent.adminID, publicEvent.superadminID FROM event inner join publicEvent", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("All events: ", { res });
    result(null, { res });
  });
};

Event.getAllPublicEventsNotVerified = (result) => {
  sql.query("SELECT event.eventID, event.universityID, event.userID, event.category, event.name, event.latitude, event.longitude, event.verified, publicEvent.adminID, publicEvent.superadminID FROM event inner join publicEvent WHERE event.verified = 0", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("All events: ", { res });
    result(null, { res });
  });
};

Event.getAllRSOEvents = (result) => {
  sql.query("SELECT event.eventID, event.universityID, event.userID, event.category, event.name, event.latitude, event.longitude, event.verified, rsoEvent.adminID, rsoEvent.rsoID FROM event inner join rsoEvent", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("All events: ", { res });
    result(null, { res });
  });
};


Event.getEvent = (eventID, result) => {
  sql.query("SELECT event.eventID, event.universityID, event.userID, event.name, event.latitude, event.longitude, privateEvent.adminID AS privateAdmin, privateEvent.superadminID as privateSuperAdmin, rsoEvent.adminID as rsoAdmin, rsoEvent.rsoID, publicEvent.adminID as publicAdmin, publicEvent.superadminID as publicSuperAdmin FROM event LEFT JOIN privateEvent on event.eventID = privateEvent.eventID LEFT JOIN rsoEvent on event.eventID = rsoEvent.eventID LEFT JOIN publicEvent on event.eventID = publicEvent.eventID WHERE event.eventID = ?", eventID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("All events: ", { res });
    result(null, { res });
  });
};

//update event
Event.verifyEvent = (eventID, result) => {
  sql.query("UPDATE event SET verified = true where eventID = ?", eventID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("All events: ", { res });
    result(null, { res });
  });
};

//delete event



module.exports = Event;
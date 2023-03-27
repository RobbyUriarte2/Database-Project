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
  this.eventStart = Event.eventStart;
  this.eventEnd = Event.eventEnd;
};

var insertID;
var superadminID;
function getinsertID()
{
  return insertID.insertID;
}
function setinsertID(setting)
{
  insertID = setting;
}
function getsuperAdminID()
{
  return superadminID;
}
function setsuperAdminID(setting)
{
  superadminID = setting;
}



//creates a public event
Event.createEvent = async (newEvent, result) => {
  await sql.then((database) => {
  database.query("INSERT INTO event SET ?", newEvent, (err, ress) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: ress.insertId, ...newEvent })
    });
  });
  return;
};

Event.createPublic = async(insertID, userID, universityID, data, result) =>
{
  await sql.then((database) => {
    database.query("SELECT DISTINCT users.userID from users where permission = 'superadmin' AND universityID =  ?", universityID, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      setsuperAdminID(res[0].userID)
      database.query(`INSERT INTO publicEvent (eventID, adminID, superadminID) VALUES (${insertID},${userID},${res[0].userID})`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
      });
    });
  });
  result(null, data);
  return;
}

//creates a private event
Event.createPrivate = async (insertID, userID, universityID, data, result) => {
  await sql.then((database) => {

  var superadminID;
  database.query("SELECT DISTINCT users.userID from users where permission = 'superadmin' AND universityID = ?", universityID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    database.query("INSERT INTO privateEvent (eventID, adminID, superadminID) VALUES (?,?,?)", insertID, userID, res[0].userID, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
    });
  });
  result(null, data)
});
};

//creates an RSO event
Event.createRSO = async (insertID, userID, rsoID, data, result) => {
  await sql.then((database) => {
  database.query(`INSERT INTO rsoEvent (eventID, adminID, rsoID) VALUES ('${insertID}','${userID}','${rsoID}')`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
  });
  result(null, data)
});
};

//gets all events in the system (prob dont use)
Event.getAll = async (result) => {
  await sql.then((database) => {
    database.query("SELECT event.eventID, event.eventStart, event.eventEnd,event.universityID, event.userID, event.name, event.latitude, event.longitude, privateEvent.adminID AS privateAdmin, privateEvent.superadminID as privateSuperAdmin, rsoEvent.adminID as rsoAdmin, rsoEvent.rsoID, publicEvent.adminID as publicAdmin, publicEvent.superadminID as publicSuperAdmin FROM event LEFT JOIN privateEvent on event.eventID = privateEvent.eventID LEFT JOIN rsoEvent on event.eventID = rsoEvent.eventID LEFT JOIN publicEvent on event.eventID = publicEvent.eventID WHERE event.verified = 1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("All events: ", { res });
    result(null, { res });
  });
});
};

//gets all private events associate with a university (use)
Event.getAllPrivateEvents = async (universityID, result) => {
  await sql.then((database) => {
    database.query(`SELECT event.eventID, event.eventStart, event.eventEnd,event.universityID, event.userID, event.category, event.name, event.latitude, event.longitude, event.verified, privateEvent.adminID, privateEvent.superadminID FROM event inner join privateEvent WHERE event.universityID = '${universityID}' AND event.verified = 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("All events: ", { res });
    result(null, { res });
  });
});

};

//gets all private events not verified in a university (will need to be approved by the super admin of the uni)
Event.getAllPrivateEventsNotVerified = async (universityID, result) => {
  await sql.then((database) => {
    database.query("SELECT event.eventID, event.eventStart, event.eventEnd,event.universityID, event.userID, event.category, event.name, event.latitude, event.longitude, event.verified, privateEvent.adminID, privateEvent.superadminID FROM event inner join privateEvent WHERE event.verified = 0 AND event.universityID = ?", universityID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("All events: ", { res });
    result(null, { res });
  });
});
};

//gets all public events
Event.getAllPublicEvents = async (result) => {
  await sql.then((database) => {
    database.query("SELECT event.eventID, event.eventStart, event.eventEnd,event.universityID, event.userID, event.category, event.name, event.latitude, event.longitude, event.verified, publicEvent.adminID, publicEvent.superadminID FROM event inner join publicEvent WHERE event.verified = 1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("All events: ", { res });
    result(null, { res });
  });
});
};

//gets all public events not verified (will need to be verified by superadmin of the uni)
Event.getAllPublicEventsNotVerified = async (universityID, result) => {
  await sql.then((database) => {
    database.query("SELECT event.eventID, event.eventStart, event.eventEnd,event.universityID, event.userID, event.category, event.name, event.latitude, event.longitude, event.verified, publicEvent.adminID, publicEvent.superadminID FROM event inner join publicEvent WHERE event.verified = 0 AND event.universityID = ?", universityID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("All events: ", { res });
    result(null, { res });
  });
});
};

//gets all the events of the RSOs for which the user is a member
Event.getAllRSOEvents = async (userID, result) => {
  await sql.then((database) => {
    database.query(`SELECT event.eventID, event.eventStart, event.eventEnd, event.universityID, event.userID, event.category, event.name, event.latitude, event.longitude, event.verified, rsoEvent.adminID, rsoEvent.rsoID FROM event inner join rsoEvent WHERE EXISTS(select distinct rso_user.userID from rso_user WHERE rso_user.userID = '${userID}' AND rso_user.rsoID = rsoEvent.rsoID)`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("All events: ", { res });
    result(null, { res });
  });
});
};

//gets the details of a specific event
Event.getEvent = async (eventID, result) => {
  await sql.then((database) => {
    database.query("SELECT event.eventID, event.eventStart, event.eventEnd,event.universityID, event.userID, event.name, event.latitude, event.longitude, privateEvent.adminID AS privateAdmin, privateEvent.superadminID as privateSuperAdmin, rsoEvent.adminID as rsoAdmin, rsoEvent.rsoID, publicEvent.adminID as publicAdmin, publicEvent.superadminID as publicSuperAdmin FROM event LEFT JOIN privateEvent on event.eventID = privateEvent.eventID LEFT JOIN rsoEvent on event.eventID = rsoEvent.eventID LEFT JOIN publicEvent on event.eventID = publicEvent.eventID WHERE event.eventID = ?", eventID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("All events: ", { res });
    result(null, { res });
  });
});
};

//update event
Event.verifyEvent = async (eventID, result) => {
  await sql.then((database) => {
    database.query("UPDATE event SET verified = true where eventID = ?", eventID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("All events: ", { res });
    result(null, { res });
  });
});
};

//delete event



module.exports = Event;
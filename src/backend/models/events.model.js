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
  this.contactPhone = Event.contactPhone;
  this.email = Event.email;
  this.description = Event.description;
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
  }).catch((err) => {
    console.log(err);
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
        result(null, data);
      });
    });
  }).catch((err) => {
    console.log(err);
  });
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
    database.query(`INSERT INTO privateEvent (eventID, adminID, superadminID) VALUES ('${insertID}','${userID}','${res[0].userID}')`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("reached here")
      result(null, data)
    });
  });
}).catch((err) => {
  console.log(err);
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
    result(null, data)
  });
}).catch((err) => {
  console.log(err);
});
};

//gets all events in the system (prob dont use)
Event.getAll = async (result) => {
  await sql.then((database) => {
    database.query("SELECT DISTINCT event.eventID, event.contactPhone, event.description, event.email, event.eventStart, event.eventEnd,event.universityID, event.userID, event.name, event.latitude, event.longitude, privateEvent.adminID AS privateAdmin, privateEvent.superadminID as privateSuperAdmin, rsoEvent.adminID as rsoAdmin, rsoEvent.rsoID, publicEvent.adminID as publicAdmin, publicEvent.superadminID as publicSuperAdmin FROM event LEFT JOIN privateEvent on event.eventID = privateEvent.eventID LEFT JOIN rsoEvent on event.eventID = rsoEvent.eventID LEFT JOIN publicEvent on event.eventID = publicEvent.eventID WHERE event.verified = 1", (err, res) => {
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
    database.query(`SELECT DISTINCT event.eventID, event.contactPhone, event.description, event.email,event.eventStart, event.eventEnd,event.universityID, event.userID, event.category, event.name, event.latitude, event.longitude, event.verified, privateEvent.adminID, privateEvent.superadminID FROM event inner join privateEvent on event.eventID = privateEvent.eventID WHERE event.universityID = '${universityID}' AND event.verified = 1`, (err, res) => {
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
    database.query("SELECT DISTINCT event.eventID, event.contactPhone, event.description, event.email,event.eventStart, event.eventEnd,event.universityID, event.userID, event.category, event.name, event.latitude, event.longitude, event.verified, privateEvent.adminID, privateEvent.superadminID FROM event inner join privateEvent on event.eventID = privateEvent.eventID WHERE event.verified = 0 AND event.universityID = ?", universityID, (err, res) => {
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
    database.query("SELECT DISTINCT event.eventID, event.contactPhone, event.description, event.email,event.eventStart, event.eventEnd,event.universityID, event.userID, event.category, event.name, event.latitude, event.longitude, event.verified, publicEvent.adminID, publicEvent.superadminID FROM event inner join publicEvent on event.eventID = publicEvent.eventID WHERE event.verified = 1", (err, res) => {
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
    database.query("SELECT DISTINCT event.eventID, event.contactPhone, event.description, event.email,event.eventStart, event.eventEnd,event.universityID, event.userID, event.category, event.name, event.latitude, event.longitude, event.verified, publicEvent.adminID, publicEvent.superadminID FROM event inner join publicEvent on event.eventID = publicEvent.eventID WHERE event.verified = 0 AND event.universityID = ?", universityID, (err, res) => {
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
    database.query(`SELECT DISTINCT event.eventID, event.contactPhone, event.description, event.email,event.eventStart, event.eventEnd, event.universityID, event.userID, event.category, event.name, event.latitude, event.longitude, event.verified, rsoEvent.adminID, rsoEvent.rsoID FROM event inner join rsoEvent on event.eventID = rsoEvent.eventID WHERE EXISTS(select distinct rso_user.userID from rso_user WHERE rso_user.userID = '${userID}' AND rso_user.rsoID = rsoEvent.rsoID)`, (err, res) => {
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
    database.query("SELECT DISTINCT event.eventID, event.contactPhone, event.description, event.email,event.eventStart, event.eventEnd,event.universityID, event.userID, event.name, event.latitude, event.longitude, privateEvent.adminID AS privateAdmin, privateEvent.superadminID as privateSuperAdmin, rsoEvent.adminID as rsoAdmin, rsoEvent.rsoID, publicEvent.adminID as publicAdmin, publicEvent.superadminID as publicSuperAdmin FROM event LEFT JOIN privateEvent on event.eventID = privateEvent.eventID LEFT JOIN rsoEvent on event.eventID = rsoEvent.eventID LEFT JOIN publicEvent on event.eventID = publicEvent.eventID WHERE event.eventID = ?", eventID, (err, res) => {
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
    let queryStatement = `UPDATE event SET verified = true where eventID = ${eventID}`;
    database.query(queryStatement, (err, res) => {
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

Event.betterErrorLog = async (newEvent, result) => {
  await sql.then((database) => {
  database.query(`SELECT * FROM event WHERE event.latitude = '${newEvent.latitude}' AND event.longitude = '${newEvent.longitude}' AND ((event.eventStart <= '${newEvent.eventStart}' AND event.eventEND >= '${newEvent.eventStart}') OR (event.eventStart <= '${newEvent.eventEnd}' AND event.eventEND >= '${newEvent.eventEnd}') OR (event.eventStart >= '${newEvent.eventEnd}' AND event.eventEND <= '${newEvent.eventEnd}'))`, newEvent, (err, ress) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { ress })
    });
  }).catch((err) => {
    console.log(err);
  });
  return;
};

Event.checkRSOAdminStatus = async (userID, rsoID, result) => {
  await sql.then((database) => {
  database.query(`SELECT COUNT(*) as Count FROM rso_user WHERE rso_user.userID = '${userID}' AND rso_user.rsoID = '${rsoID}' AND rso_user.isAdmin = True`, (err, ress) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log(ress[0]);
    console.log(ress[0].Count);
    if(ress[0].Count > 0)
      result(null, { status: true })
    else
      result(null, {status: false})
    });
  }).catch((err) => {
    console.log(err);
  });
  return;
};

//delete event



module.exports = Event;
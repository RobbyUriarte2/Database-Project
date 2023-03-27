const sql = require("./db.js");

// constructor
const RSO = function(RSO) {
  this.universityID = RSO.universityID;
  this.NameRSO = RSO.NameRSO;
  this.DescriptionRSO = RSO.DescriptionRSO;
  this.verified = RSO.verified;
};

RSO.create = async (newRSO, userID, result) => {
  await sql.then((database) => {
    var newID;
    database.query("INSERT INTO rso SET ?", newRSO, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      newID = res.insertId;
      console.log("created rso: ", { id: res.insertId, ...newRSO });
      //result(null, { id: res.insertId, ...newRSO });
    });

    database.query("INSERT INTO rso_user (rsoID, userID, isAdmin) VALUES (?,?,?)", newID, userID, 1, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }    
      result(null, { id: res.insertId, ...newRSO });

    });
  }).catch((err) => {
    console.log(err);
  });
};


RSO.addUser = async (rsoID, userID, result) => {
  await sql.then((database) => {
    database.query("INSERT INTO rso_user (rsoID, userID, isAdmin) VALUES (?,?,?)", rsoID, userID, 0, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("added rso user: ", {rsouser});
      result(null, {rsouser});
    });
  }).catch((err) => {
    console.log(err);
  });
};

RSO.GetAll = async (result) => {
  await sql.then((database) => {
    database.query("SELECT * FROM rso LEFT JOIN university ON rso.universityID = university.universityID", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("added rso user: ", {res});
      result(null, {res});
    });
  }).catch((err) => {
    console.log(err);
  });
};

RSO.getUniversity = async (universityID, result) => {
  await sql.then((database) => {
    database.query("SELECT * FROM rso LEFT JOIN university ON rso.universityID = university.universityID WHERE rso.universityID = ?", universityID, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("added rso user: ", {res});
      result(null, {res});
    });
  }).catch((err) => {
    console.log(err);
  });
};

RSO.update = async (newRSO, result) => {
  await sql.then((database) => {
    database.query("UPDATE rso SET ? WHERE rso.rsoID = ?", newRSO, newRSO.rsoID, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("updated rso: ", { newRSO });
      result(null, { newRSO });
    });
  }).catch((err) => {
    console.log(err);
  });
};

RSO.delete = async (rsoID, result) => {
  await sql.then((database) => {
    database.query("DELETE FROM rso WHERE rsoID = ?", rsoID, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("deleted rso: ", { rsoID:rsoID });
      result(null, { rsoID:rsoID });
    });
  }).catch((err) => {
    console.log(err);
  });
};

RSO.deleteUser = async (rsoID, userID, result) => {
  await sql.then((database) => {
    database.query("DELETE FROM rso_user WHERE rsoID = ? AND userID = ?", rsoID, userID, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("deleted rso: ", { rsoID:rsoID });
      result(null, { rsoID:rsoID });
    });
  }).catch((err) => {
    console.log(err);
  });
};




module.exports = RSO;
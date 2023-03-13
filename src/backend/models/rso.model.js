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


      result(null, { id: res.insertId, ...newRSO });

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


RSO.AddUser = async (rsoID, userID, result) => {
  await sql.then((database) => {
    var newID;
    database.query("INSERT INTO rso_user (rsoID, userID, isAdmin) VALUES (?,?,?)", rsoID, userID, 0, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      newID = res.insertId;
      console.log("added rso user: ", {rsouser});


      result(null, {rsouser});

    });
  }).catch((err) => {
    console.log(err);
  });
};

//have an enter of username and password

module.exports = RSO;
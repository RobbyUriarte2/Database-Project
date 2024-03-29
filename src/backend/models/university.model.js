const sql = require("./db.js");

// constructor
const University = function(University) {
  this.nameUniversity = University.nameUniversity;
  this.latitude = University.latitude;
  this.longitude = University.longitude;
  this.emailDomain = University.emailDomain;
};

University.create = async (newUniversity, result) => {
  await sql.then((database) => {
    database.query("INSERT INTO university SET ?", newUniversity, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created university: ", { id: res.insertId, ...newUniversity });
      result(null, { id: res.insertId, ...newUniversity });
    });
  }).catch((err) => {
    console.log(err);
  });
  
};

University.getAll = async (result) => {
  await sql.then((database) => {
    database.query("SELECT * FROM university",  (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      result(null, res);
    });
  }).catch((err) => {
    console.log(err);
  });
};


  University.getAllNoAdmin = async (result) => {
    await sql.then((database) => {
      database.query("SELECT * FROM university X WHERE NOT EXISTS(SELECT * FROM users U WHERE U.universityID = X.universityID AND U.permission = 'superadmin')",  (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        result(null, res);
      });
    }).catch((err) => {
      console.log(err);
    });
  
};


module.exports = University;
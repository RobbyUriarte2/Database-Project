const sql = require("./db.js");

// constructor
const User = function(User) {
  this.userID = User.userID;
  this.email = User.email;
  this.password = User.password;
  this.permission = User.permission;
  this.salt = User.salt;
  this.universityID = User.universityID;
};

User.create = async (newUser, result) => {
  await sql.then((database) => {
    database.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  }).catch((err) => {
    console.log(err);
  });
  
};

module.exports = User;
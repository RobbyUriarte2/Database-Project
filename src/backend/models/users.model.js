const sql = require("./db.js");

// constructor
const User = function(User) {
  this.userID = User.userID;
  this.email = User.email;
  this.password = User.password;
  this.salt = User.salt;
  this.universityID = User.universityID;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

//have an enter of username and password
User.login = (email, password, result) => {
  sql.query("SELECT * FROM users WHERE email = ?", email, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if(res.password != password)
    {
      result("Passwords do not match", null)
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
}



module.exports = User;
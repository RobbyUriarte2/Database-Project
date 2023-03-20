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

    console.log("returned user id: ", { id: res.id});
    result(null, { id: res.id});
  });
};


User.update = (updatedUser, result) => {
  sql.query("UPDATE users SET ? WHERE userID = ?", updatedUser, updatedUser.userID ,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("updated user: ", updatedUser);
    result(null, updatedUser );
  });
};

User.delete = (userID, result) => {
  sql.query("DELETE FROM users WHERE userID = ?", userID ,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("deleted user: ", {userID:userID});
    result(null, {userID:userID} );
  });
};




module.exports = User;
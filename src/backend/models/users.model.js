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
User.login = async (email, password, result) => {
  await sql.then((database) => {
    let queryStatement = `SELECT * FROM users WHERE email = '${email}'`
    database.query(queryStatement, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
      if(password == res[0].password)
      {
        console.log("returned user: ", { user: res[0]});
        result(null, { user: res[0]});
        return;
      }
      else
      {
        result("incorrect password", null)
        return;
      }
    });
  }).catch((err) => {
    console.log(err);
  });
};

User.CheckAdmin = async (user, result) => {
  await sql.then((database) => {
  let queryStatement2 = `SELECT COUNT(*) AS COUNT FROM rso_user WHERE rso_user.userID = '${user.user.userID}' AND rso_user.isAdmin = 1`
  database.query(queryStatement2, (err, res) => {
  if (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
  console.log(res)
  if(res[0].COUNT > 0 && user.user.permission != "superadmin")
  {
    user.user.permission = "admin";
  }
  result(null, user);
  });
  });
};

User.get = async (userID, result) => {
  await sql.then((database) =>{
    let queryStatement = `SELECT * FROM users WHERE userID = ${userID}`
    database.query(queryStatement, (err, res) => {
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

User.update = async (updatedUser, result) => {
  await sql.then((database) =>{
    let queryStatement = `UPDATE users SET ? WHERE userID = ${updatedUser.userID}`
    database.query(queryStatement, updatedUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("updated user: ", updatedUser);
      result(null, updatedUser );
    });
  }).catch((err) => {
    console.log(err);
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
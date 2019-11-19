const mysql = require('mysql');

class Connection {
  
  constructor() {
    this.con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "password_manager"
    });
  }

  GetUsers() {
    return new Promise((resolve, reject) => {
      this.con.query("SELECT * FROM users", (err, rows) => {
          rows === undefined ? reject(new Error("Error: rows is undefined")) : resolve(rows);
      });
    });
  }
}

module.exports = Connection;
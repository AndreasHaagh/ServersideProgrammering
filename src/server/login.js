const db = require('./lib/db');
const bcrypt = require('bcryptjs');

class Login {
  LoginUser(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      db.query(`SELECT * FROM users WHERE name = '${username}'`, (err, results, fields) => {
        if (results.length > 0) {
          bcrypt.compare(password, results[0].password, (err, result) => {
            if (result) {
              req.session.loggedin = true;
              req.session.user = results[0];
              res.redirect('/home');
            } else {
              res.send(`Incorrect Password! ${password}`);
            }
          });
        } else {
          res.send(`Incorrect Username! ${password}`);
        }
      });
    } else {
      res.send('Please enter username and password');
    }
  }

  IsLoginIn(req, res, next) {
    if (req.session && req.session.loggedin) {
      next();
    } else {
      res.redirect('/');
    }
  }
}

module.exports = Login;
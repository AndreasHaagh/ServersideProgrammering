const db = require('./lib/db');
const bcrypt = require('bcryptjs')

const signup = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const password_match = req.body.password_match;

  if (username && password && password_match) {
    if (password == password_match) {
      bcrypt.hash(password, 10, (err, hash) => {
        const post = {
          name: username,
          password: hash,
          token: "1234567890"
        }
        db.query('INSERT INTO users SET ?', post, (err, result) => {
          if (err) throw err;
          console.log(result);
          res.redirect('/');
        });
      });
    } else {
      res.send('Passwords did not match');
    }
  } else {
    res.send('Please enter username and password');
  }
}

module.exports = signup;
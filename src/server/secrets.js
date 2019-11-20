const db = require('./lib/db');

class Secrets {
  GetSecrets(req, res) {
    db.query(`SELECT * FROM secrets WHERE user_id = '${req.session.user.id}'`, (err, result, fields) => {
      res.send(result);
    });
  }

  InsertSecret(req, res) {
    const password = req.body.password;
    const source = req.body.source;
    
    if (password && source) {
      var post = {
        user_id: req.session.user.id,
        password: password,
        source: source
      }
      db.query(`INSERT INTO secrets SET ?`, post, (err, result) => {
        if (err) throw err;
        res.redirect('/home');
      });
    } else {
      res.send('Please enter source and password');
    }
  }

  UpdateSecret(req, res) {
    return new Promise((resolve, reject) => {

    });
  }

  DeleteSecret(req, res) {
    return new Promise((resolve, reject) => {

    });
  }
}

module.exports = Secrets;
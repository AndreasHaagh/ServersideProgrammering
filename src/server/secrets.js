const db = require('./lib/db');

class Secrets {
  GetSecrets(req, res) {
    const source = req.query.source;
    var sql;
    if (source) {
      sql = `SELECT * FROM secrets WHERE source = '${source}' AND user_id =`;
    } else {
      sql = `SELECT * FROM secrets WHERE user_id =`;
    }
    db.query(`${sql} '${req.session.user.id}'`, (err, result, fields) => {
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
    const id = req.body.id;
    const source = req.body.source;
    const password = req.body.password;
    if (id && source && password) {
      db.query('UPDATE secrets SET source = ?, password = ? WHERE id = ?', [source, password, id], (err, result) => {
        if (err) throw err;
        res.redirect('/home');
      });
    } else {
      res.send('Missing source, password or id');
    }
  }

  DeleteSecret(req, res) {
    const id = req.body.id
    if (id) {
      db.query(`DELETE FROM secrets WHERE id = '${req.body.id}'`, (err, result) => {
        if (err) throw err;
        res.redirect('/home');
      });
    } else {
      res.send('Please provide an id on the secret');
    }
  }
}

module.exports = Secrets;
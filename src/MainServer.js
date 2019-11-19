const express = require('express');
const session = require('express-session');
const path = require('path');
const db = require('./server/lib/db');
const app = express();
const port = 3001;

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
})

const router = express.Router();
router.get('/', (req, res) => {
  res.send('Hello api');
});

app.post('/auth', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    db.query(`SELECT * FROM users WHERE name = '${username}' AND password = '${password}'`, (err, results, fields) => {
      if (results.length > 0) {
        req.session.loggedin = true;
        req.session.username = username;
        res.redirect('/home');
      } else {
        res.send(`Incorrect Username and/or Password! ${username} ${password}`);
      }
      res.end();
    });
  } else {
    res.send('Please enter username and password');
    res.end();
  }
});

app.get('/home', (req, res) => {
  if (req.session.loggedin) {
    res.send(`Welcome back ${req.session.username}!`);
  } else {
    res.redirect('/')
  }
  res.end();
});

app.use('/api', router);

app.listen(port, () => console.log(`The server is runnning on port ${port}`));

const express = require('express');
const session = require('express-session');
const path = require('path');
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
  res.sendFile(path.join(__dirname+'/pages/index.html'));
});

app.get('/scripts/home.js', (req, res) => {
  res.sendFile(path.join(__dirname+'/scripts/home.js'));
});

app.get('/styles/main.css', (req, res) => {
  res.sendFile(path.join(__dirname+'/styles/main.css'));
});

const Login = require('./server/login');
const login = new Login();

app.post('/auth', login.LoginUser);
app.get('/userdata', login.IsLoginIn, (req, res) => {
  res.send(req.session.user);
  res.end();
});

app.post('/logout', login.IsLoginIn, (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) throw err;
      res.redirect('/');
    })
  }
});

const signup = require('./server/signup');
app.post('/sign-up', signup);

app.get('/home', (req, res) => {
  if (req.session.loggedin) {
    res.sendFile(path.join(__dirname+'/pages/home.html'));
  } else {
    res.redirect('/')
  }
});

const Secrets = require('./server/secrets');
const secrets = new Secrets();

app.post('/newSecret', login.IsLoginIn, secrets.InsertSecret);
app.get('/getSecrets', login.IsLoginIn, secrets.GetSecrets);
app.post('/deleteSecret', login.IsLoginIn, secrets.DeleteSecret);
app.post('/updateSecret', login.IsLoginIn, secrets.UpdateSecret);

app.listen(port, () => console.log(`The server is runnning on port ${port}`));

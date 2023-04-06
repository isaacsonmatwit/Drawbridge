const express = require('express');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const app = express();
const sql3 = sqlite3.verbose();

const CryptoJS = require("crypto-js"); // Password encryption thingy
const cookieParser = require('cookie-parser');

const cwd = process.cwd(); // Current Working Directory

app.use(express.static(cwd));//Use the Current Working Directory
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//Create the db instance
const db = new sql3.Database('../users.db', (err)=> {
    if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the users.db SQLite database.');
});

//Create the users table
db.run('CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, password TEXT)', (err)=> {
  if (err) {
      return console.error(err.message);
    } else{
      console.log("New table created");
    }
});

app.get('/', (req, res) => {
  console.log('/ request ckys: '+req.cookies.user.LastLogin+'; '+req.cookies.user.LastLogout);
  let lastLogin = req.cookies.user.LastLogin;
  let lastLogout = req.cookies.user.LastLogout;
  if(lastLogin <= lastLogout)
    res.send('/login.html');
  else
    res.send('/index.html');
});

//Registration form action
app.post('/addUser', (req, res)=>{
  const {username, password}=req.body;
  console.log('/addUser request ckys: '+req.cookies.user.LastLogin+'; '+req.cookies.user.LastLogout);
  if(checkCredentials(username,password)){
    res.cookie("user",{
      Username: username,
      LastLogin: new Date().getTime(),
      LastLogout: 0
    });
    res.redirect('/index.html');
  } else
    res.redirect('/register.html');
});

app.get('/user', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    if(res.cookie.user)
      res.cookie("user",req.cookies.user);
    res.send(rows);
  });
});

app.post('/logout', (req, res) => {
  if(req.cookies.user){ // If 'user' cookie exists in req.cookies, then log it & set res.cookie;
    console.log('/logout request ckys: ',req.cookies);
    res.cookie("user",{
      Username: req.cookies.user.Username,
      LastLogin: req.cookies.user.LastLogin,
      LastLogout: new Date().getTime()
    });
  }
  res.redirect('/login.html');
});

//Listen for GETs & POSTs & stuff
app.listen(5500, () => {
  console.log('Server is running on http://localhost:5500');
});

//--Login stuff--//

app.post('/auth', function (request, response) {
  let username = request.body.username;
  let password = request.body.password;
  var hashString = CryptoJS.SHA512(password).toString();
  if (username && password) {
    db.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, hashString], (err, row) => {
      if (err) {
        console.error(err);
      } else {
        if (row) {
          console.log('Login sucessful');
          console.log('username input: ' + username + ' password input: ' + password + ' hash of password: ' + hashString);
          //console.log(row);
          response.cookie("user",{
            Username: username,
            LastLogin: new Date().getTime(),
            LastLogout: request.cookies.user.LastLogout
          });
          response.redirect('/index.html');
        } else {
          console.log('username input: ' + username + ' password input: ' + password + ' hash of password: ' + hashString);
          console.log(row);
          console.log('Invalid username or password');
          
          response.redirect('/login.html');
          response.end();
        }
      }
    });
  } else {
    response.send('Please enter a username and password!');
    response.end();
  }
});

//--Credential Stuff--//
async function saveCredentials(username, password) {
  var hashString = CryptoJS.SHA512(password).toString();
  db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashString]);
  const users = db.all(`SELECT * FROM users`);
  console.log(users);
}

function checkCredentials(username,password) {
  let strongPassword = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})';
  let pwd = "" + password;
  if (pwd.match(strongPassword)) {
    console.log('Password check passed!');
    if (username != 0) {
      console.log('attempting to save credentials..');
      saveCredentials(username, password);
      return true;
    }
  }
  console.log('Password check failed: '+pwd.match(strongPassword)+' : usr='+username+', pwd='+password);
  return false;
}

function check() {
  let pwd = document.getElementById('password').value;
  let pwdConfirm = document.getElementById('passwordConfirm').value;
  let checker = document.getElementById('checker');

  if (pwd != "" && pwd == pwdConfirm) {
    checker.style.color = 'green';
    checker.innerHTML = 'matching';
    return true;
  } else {
    checker.style.color = 'red';
    checker.innerHTML = 'not matching';
  }
  return false;
}

function checkPWComplexity() {
  let passwordField = document.getElementById('password').value;

  if (passwordField.length >= 8)
    document.getElementById('pwLength').style.color = 'green';
  else
    document.getElementById('pwLength').style.color = '#AF0C0C';

  if (passwordField.match(/[a-z]/))
    document.getElementById('pwLowerCase').style.color = 'green';
  else
    document.getElementById('pwLowerCase').style.color = '#AF0C0C';

  if (passwordField.match(/[A-Z]/))
    document.getElementById('pwUpperCase').style.color = 'green';
  else
    document.getElementById('pwUpperCase').style.color = '#AF0C0C';

  if (passwordField.match(/\d/))
    document.getElementById('pwNumbers').style.color = 'green';
  else
    document.getElementById('pwNumbers').style.color = '#AF0C0C';

  if (passwordField.match(/[^a-zA-Z\d]/))
    document.getElementById('pwSpecialChar').style.color = 'green';
  else
    document.getElementById('pwSpecialChar').style.color = '#AF0C0C';

}

//--Date Conversions--//

// Converts a number of weeks to a date;
// @Returns this date + (weeks); can be used for expire date;
function weeksToDate(weeks) {
  const d = new Date();
  d.setTime(d.getTime() + (weeks*7*24*60*60*1000));
  return d.toUTCString();
}

// Converts a number of days to a date;
// @Returns this date + (days); can be used for expire date;
function daysToDate(days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  return d.toUTCString();
}

// Converts a number of hours to a date;
// @Returns this date + (hours); can be used for expire date;
function hoursToDate(hours) {
  const d = new Date();
  d.setTime(d.getTime() + (hours*60*60*1000));
  return d.toUTCString();
}

function getCurrentDate(){
  return new Date().toUTCString();
}
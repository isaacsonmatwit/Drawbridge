const express = require('../JavaScript/node_modules/express');
const sqlite = require('../JavaScript/node_modules/sqlite');
const sqlite3 = require('../JavaScript/node_modules/sqlite3');
const bodyParser = require('../JavaScript/node_modules/body-parser');
const app = express();
const sql3 = sqlite3.verbose();

const cwd = process.cwd();//Current Working Directory

app.use(express.static(cwd));//Use the Current Working Directory
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var checkPassed = false;

const db = new sql3.Database('../../users.db', (err)=> {
    if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the users.db SQLite database.');
});

db.run('CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, password TEXT)', (err)=> {
  if (err) {
      return console.error(err.message);
    } else{
      console.log("New table created");
    }
});

app.get('/', (req, res) => {
  res.redirect('/register.html');
});

app.post('/addUser', (req, res)=>{
  const {username, password}=req.body;
  console.log(req.body);
  if(checkCredentials(username,password))
    res.redirect('/index.html');
  else
    res.redirect('/register.html');
});

app.get('/user', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.send(rows);
  });
});

app.listen(5500, () => {
  console.log('Server is running on http://localhost:5500');
});

async function saveCredentials(username, password) {
  console.log('-> saveCredentials(...)');
  console.log('-> await db.run(Insert...)');
  db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password]);
  console.log(`User ${username} saved to the database`);
  console.log('-> const users = await db.all(`SELECT * FROM users`);');
  const users = await db.all(`SELECT * FROM users`);
  console.log(users);
}

function checkCredentials(username,password) {
  let strongPassword = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})';
  let pwd = "" + password;
  //if (pwd.match(strongPassword) && checkPassed) {
    console.log('Password check passed!');
    if (username != 0) {
      console.log('attempting to save credentials..');
      saveCredentials(username, password);
      //window.location.replace('index.html');
      return true;
    }
  //}
  console.log('Password check failed: '+pwd.match(strongPassword)+' | '+checkPassed+' : usr='+username+', pwd='+password);
  return false;
}

function check() {
  let pwd = document.getElementById('password').value;
  let pwdConfirm = document.getElementById('passwordConfirm').value;
  let checker = document.getElementById('checker');

  if (pwd == pwdConfirm && pwd != "") {
    checker.style.color = 'green';
    checker.innerHTML = 'matching';
    //submitBtn.disabled = false;
    checkPassed = true;
    return true;
  } else {
    checker.style.color = 'red';
    checker.innerHTML = 'not matching';
    checkPassed = false;
  }
  return false;
}

function checkPWComplexity() {
  let passwordField = document.getElementById('password').value;

  if (passwordField.length >= 8) {
    document.getElementById('pwLength').style.color = 'green';
  } else {
    document.getElementById('pwLength').style.color = '#AF0C0C';
  }

  if (passwordField.match(/[a-z]/)) {
    document.getElementById('pwLowerCase').style.color = 'green';
  } else {
    document.getElementById('pwLowerCase').style.color = '#AF0C0C';
  }

  if (passwordField.match(/[A-Z]/)) {
    document.getElementById('pwUpperCase').style.color = 'green';
  } else {
    document.getElementById('pwUpperCase').style.color = '#AF0C0C';
  }

  if (passwordField.match(/\d/)) {
    document.getElementById('pwNumbers').style.color = 'green';
  } else {
    document.getElementById('pwNumbers').style.color = '#AF0C0C';
  }

  if (passwordField.match(/[^a-zA-Z\d]/)) {
    document.getElementById('pwSpecialChar').style.color = 'green';
  } else {
    document.getElementById('pwSpecialChar').style.color = '#AF0C0C';
  }
}

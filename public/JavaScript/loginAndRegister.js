const express = require('express');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

function check() {
  let pwd = document.getElementById('password');
  let pwdConfirm = document.getElementById('passwordConfirm');
  let checker = document.getElementById('checker');
  if (pwd.value == "") {
  } else if (pwd.value == pwdConfirm.value) {
    checker.style.color = 'green';
    checker.innerHTML = 'matching';
    return true;
  } else {
    checker.style.color = 'red';
    checker.innerHTML = 'not matching';
  }

}

function togglePW() {
  let passwordField = document.getElementById("password");
  let confirmPasswordField = document.getElementById("passwordConfirm");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    confirmPasswordField.type = "text";
  }
  else {
    passwordField.type = "password";
    confirmPasswordField.type = "password";
  }
}

async function saveCredentials(username, password) {
  const db = await dbPromise;
  await db.run(`CREATE TABLE IF NOT EXISTS users (
    username TEXT UNIQUE,
    password TEXT
  )`);
  await db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password]);
  console.log(`User ${username} saved to the database`);
  const users = await db.all(`SELECT * FROM users`);
  console.log(users);
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

function registerSubmitBtn() {
  let passwordField = document.getElementById('password').value;
  let userNameField = document.getElementById('username').value;
  let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

  if (passwordField.match(strongPassword)) {
    if (check()) {
      if (userNameField != 0) {
        // saveCredentials(userNameField, passwordField);
        // window.location.replace("index.html");
        return true;
      }
    }
    return false;
  }
}

const dbPromise = sqlite.open('./users.db', { Promise });
let db;

(async () => {
  db = await dbPromise;
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
})();

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
 
  try {
    await saveCredentials(username, password);
    res.status(200).send('User registered successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user');
  }
});

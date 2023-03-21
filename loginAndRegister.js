const express = require('express');
const sqlite = require('sqlite')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const app = express();

var check = function () {
  if (document.getElementById('password').value == "") {
  } else if (document.getElementById('password').value ==
    document.getElementById('passwordConfirm').value) {
    document.getElementById('checker').style.color = 'green';
    document.getElementById('checker').innerHTML = 'matching';
  } else {
    document.getElementById('checker').style.color = 'red';
    document.getElementById('checker').innerHTML = 'not matching';
  }

}

function togglePW() {
  var passwordField = document.getElementById("password");
  var confirmPasswordField = document.getElementById("passwordConfirm");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    confirmPasswordField.type = "text";
  }
  else {
    passwordField.type = "password";
    confirmPasswordField.type = "password";
  }
}

function savePWandusrname() {
  let passwordValue = document.getElementById('password')
  let usernameValue = document.getElementById()
}

app.post('/register', async (req, res) => {
  await db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`);
  const username = req.body.username;
  const password = req.body.password;

  await db.run(`
    INSERT INTO users (username, password) VALUES (?, ?)
  `, [username, password]);
});

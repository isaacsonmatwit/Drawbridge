const express = require('express');
const sqlite = require('sqlite')
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

function check() {
  let pwd = document.getElementById('password');
  let pwdConfirm = document.getElementById('passwordConfirm');
  let checker = document.getElementById('checker');
  if (pwd.value == "") {
  } else if (pwd.value == pwdConfirm.value) {
    checker.style.color = 'green';
    checker.innerHTML = 'matching';
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

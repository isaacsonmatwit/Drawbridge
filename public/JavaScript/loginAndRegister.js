const express = require('../JavaScript/node_modules/express');
const sqlite = require('../JavaScript/node_modules/sqlite');
const sqlite3 = require('../JavaScript/node_modules/sqlite3');
const bodyParser = require('../JavaScript/node_modules/body-parser');
const app = express();

//Opens connection with database
const dbPromise = sqlite.open({
  filename: '../../users.db',
  driver: sqlite3.Database,
  mode: sqlite.OPEN_READWRITE
});

let db;
let users;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('./', function (req, res) {
  res.render('users.db', {});
});


//Checks if the table users exists within users.db
//If not creates table
//takes input from Username/Password fields and inputs them into the database in the coresponding columns
async function saveCredentials(username, password) {
  console.log('-> saveCredentials(...)');
  db = await dbPromise;
  console.log('-> await db.run(...)');
  await dbPromise.run(`CREATE TABLE IF NOT EXISTS users (
    username TEXT UNIQUE,
    password TEXT
  )`);
  console.log('-> await db.run(Insert...)');
  await dbPromise.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password]);
  console.log(`User ${username} saved to the database`);
  console.log('-> const users = await db.all(`SELECT * FROM users`);');
  const users = await db.all(`SELECT * FROM users`);
  console.log(users);
}

//On press of submit button:
//Stores values input into the Username/Password field on webform
//Runs a strong password check to make sure password is secure
//Calls SaveCredentials() to store Username/Password
function registerSubmitBtn() {
  let passwordField = document.getElementById('password').value;
  let userNameField = document.getElementById('username').value;
  let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

  if (passwordField.match(strongPassword)) {
    if (check()) {
      console.log('password check passed!');
      if (userNameField != 0) {
        console.log('attempting to save credentials..');
        saveCredentials(userNameField, passwordField);
        return true;
      }
    }
    return false;
  }
}


//opens site on port 5500
(async () => {
  db = await dbPromise;
  app.listen(5500, () => {
    console.log('Server is running on http://localhost:5500');
  });
})();

//Checks for errors while registering
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

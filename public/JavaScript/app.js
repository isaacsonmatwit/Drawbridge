const express = require('express');
const sql3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
    res.sendFile(__dirname + '/register.html');
  });

app.post('/addUser', (req, res)=>{
    const {usrname, usrpass}=req.body
    db.run('INSERT INTO users (username, password) VALUES (?,?)', [usrname, usrpass], (err)=>{
        if (err) {
            return console.error(err.message);
          } else{
            console.log("New user created");
          }
          res.redirect('/');
    });
});

app.get('/usr', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.send(rows);
  });
});


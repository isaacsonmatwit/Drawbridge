const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = new sqlite3.Database('user.db', (err)=> {
    if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the user.db SQLite database.');
});

db.run('CREATE TABLE IF NOT EXISTS usr (usrname TEXT PRIMARY KEY, usrpass TEXT)', (err)=> {
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
    db.run('INSERT INTO usr (usrname, usrpass) VALUES (?,?)', [usrname, usrpass], (err)=>{
        if (err) {
            return console.error(err.message);
          } else{
            console.log("New user created");
          }
          res.redirect('/');
    });
});

app.get('/usr', (req, res) => {
  db.all('SELECT * FROM usr', [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.send(rows);
  });
});
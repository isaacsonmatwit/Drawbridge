const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();

const db = new sqlite3.Database('mydb.db', (err)=> {
    if (err) {
        return console.error(err.message);
      }
});

db.run('CREATE TABLE IF NOT EXISTS usr (usrname TEXT PRIMARY KEY, usrpass TEXT)', (err)=> {
    if (err) {
        return console.error(err.message);
      }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/register.html');
  });

app.post('/addUser', (req, res)=>{
    const {usrname, usrpass}=req.body
    db.run('INSERT INTO usr (usrname, usrpass) VALUES (?,?,?)', [usrname, usrpass], (err)=>{
        if (err) {
            return console.error(err.message);
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
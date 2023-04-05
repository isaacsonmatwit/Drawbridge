// const express = require('../JavaScript/node_modules/express');
// const sqlite = require('../JavaScript/node_modules/sqlite');
// const sqlite3 = require('../JavaScript/node_modules/sqlite3');
// const bodyParser = require('../JavaScript/node_modules/body-parser');
// const app = express();
// const sql3 = sqlite3.verbose();

// const cwd = process.cwd(); // Current Working Directory
// var CryptoJS = require("crypto-js"); // Password encryption thingy

// app.use(express.static(cwd));//Use the Current Working Directory
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// //Create the db instance
// const db = new sql3.Database('../users.db', (err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Connected to the users.db SQLite database.');
// });

// app.listen(5500, () => {
//   console.log('Server is running on http://localhost:5500');
// });

// app.post('/auth', function (request, response) {
//   let username = request.body.username;
//   let password = request.body.password;
//   var hashString = CryptoJS.SHA512(password).toString()

//   if (username && password) {
//     db.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, hashString], (err, row) => {
//       if (err) {
//         console.error(err);
//       } else {
//         if (row) {
//           console.log('Login sucessful');
//           console.log('username input: ' + username + ' password input: ' + password + ' hash of password: ' + hashString);
//           console.log(row);
//           response.redirect('/index.html');
//         } else {
//           console.log('username input: ' + username + ' password input: ' + password + ' hash of password: ' + hashString);
//           console.log(row);
//           console.log('Invalid username or password');
          
//           response.redirect('/login.html');
//           response.end();
//         }
//       }
//     });
//   } else {
//     response.send('Please enter a username and password!');
//     response.end();
//   }
// });
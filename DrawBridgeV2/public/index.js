const cwd = process.cwd();

const express = require(cwd + '/node_modules/express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;



app.use(express.static(cwd));

app.get('/', (req, res) => {
  res.sendFile('/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: '5JWggSs98cyBigw+ZtSsA7zQ8OhTup79YIaYH+LAOKR1TW6SFkgAyGARbGhgTyPO',
  baseURL: 'http://localhost:3000',
  clientID: 'dlgjMBh6ROXYiTyZy8tW6VkOpwAphB4M',
  issuerBaseURL: 'https://dev-6c8dnubymkkxrng8.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
  console.log(JSON.stringify(req.oidc.user))
});

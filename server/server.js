const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, 'public');
const port = process.env.PORT || 2053;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});

const express = require("express");
const socket = require("socket.io");
const http = require("http");

const app = express();
const PORT = 2053 || process.env.PORT;
const server = http.createServer(app);

// Set static folder
app.use(express.static("public"));

// Socket setup
const io = socket(server);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
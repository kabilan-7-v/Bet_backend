const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const http = require('http'); // Required for WebSockets
const { Server } = require('socket.io');
const { route } = require('./router/gold.router.js');
const { connect_db } = require('./Db/connectdb.js');
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
const server = http.createServer(app); // Create an HTTP server

// Initialize Socket.io on the same port
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", route);

// Handle WebSocket connections

// Connect to the database before starting the server
connect_db();

// Use Render’s assigned port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

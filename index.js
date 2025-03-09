const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const { connect_db } = require("./db/connectdb.js");
const goldRoutes = require("./routes/gold.routes.js");

dotenv.config();

const app = express();
const server = http.createServer(app); // HTTP server for API & WebSockets
const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

app.use(express.json());

// API Routes
app.use("/api/goldbet", goldRoutes);

// Start Database
connect_db();

// WebSocket Handling
const activeTimers = {};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join_room", (roomID) => {
    if (activeTimers[roomID]) {
      socket.join(roomID);
      console.log(`User ${socket.id} joined room ${roomID}`);
    } else {
      socket.emit("error", { message: "Invalid or expired room ID" });
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

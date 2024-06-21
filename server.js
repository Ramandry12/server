const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Mengizinkan semua origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware CORS untuk Express
app.use(
  cors({
    origin: "*", // Mengizinkan semua origin
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("A new user has connected", socket.id);

  // Listen for incoming messages from clients
  socket.on("message", (message) => {
    // Broadcast the message to all connected clients
    io.emit("message", message);
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log(socket.id, " disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});

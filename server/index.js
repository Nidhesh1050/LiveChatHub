const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

// ✅ Express middleware CORS config
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://phenomenal-pegasus-e43487.netlify.app"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

const server = http.createServer(app);

// ✅ Socket.IO CORS config
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://phenomenal-pegasus-e43487.netlify.app"
    ],
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  }
});

// ✅ Socket logic
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

// ✅ Run on PORT from env or default 3001
server.listen(process.env.PORT || 3001, () => {
  console.log("SERVER RUNNING on port", process.env.PORT || 3001);
});

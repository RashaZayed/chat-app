const express = require("express");
const app = express();

const server = app.listen(4000, () =>
  console.log("server is listening to port 4000")
);
const socket = require("socket.io");
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true,
  },
});

io.on("connection", (socket) => {             //event listner "connection" when that happens do this function to this exact socket(socket)
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });
});

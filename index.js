const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");

require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

/// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/documents", documentRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("joinRoom", (documentId) => {
    socket.join(documentId);
    console.log("joined room");
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`App running on port ${PORT}!`);
});

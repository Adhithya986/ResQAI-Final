require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const connectDB = require("./config/database");

const app = express();

// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===============================
// DATABASE
// ===============================

connectDB();

// ===============================
// ROUTES
// ===============================

const sosRoutes = require("./routes/sosRoutes");
const userRoutes = require("./routes/userRoutes");

console.log("✅ SOS Routes Loaded");

app.use("/api/sos", sosRoutes);
app.use("/api/users", userRoutes);

// ===============================
// TEST ROUTES
// ===============================

app.get("/", (req, res) => {
  res.send("🚨 ResQAI Backend is Running!");
});

app.get("/test", (req, res) => {
  res.send("Test route works!");
});

// ===============================
// HTTP SERVER
// ===============================

const server = http.createServer(app);

// ===============================
// SOCKET.IO
// ===============================

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  },
});

// Make Socket.IO available inside routes
app.set("io", io);

// ===============================
// SOCKET CONNECTION
// ===============================

io.on("connection", (socket) => {
  console.log("🟢 Client Connected:", socket.id);

  socket.on("broadcast-alert", (data) => {
    console.log("🚨 Broadcast:", data);

    io.emit("receive-alert", data);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client Disconnected:", socket.id);
  });
});

// ===============================
// START SERVER
// ===============================

const PORT = process.env.PORT || 5000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
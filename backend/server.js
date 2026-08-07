require("dotenv").config();
console.log("Gemini Key:", process.env.GEMINI_API_KEY);
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
// Connect to MongoDB
connectDB();

// Import Routes
const sosRoutes = require("./routes/sosRoutes");
const userRoutes = require("./routes/userRoutes");   // <-- ADD THIS

// Use Routes
app.use("/api/sos", sosRoutes);
app.use("/api/users", userRoutes);                   // <-- ADD THIS

app.get("/", (req, res) => {
  res.send("🚨 ResQAI Backend is Running!");
});

app.get("/test", (req, res) => {
  res.send("Test route works!");
});



const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST","PUT"],
  },
});

// Make io available in routes
app.set("io", io);

io.on("connection", (socket) => {
  console.log("🟢 Client Connected:", socket.id);

  socket.on("broadcast-alert", (data) => {
    console.log("🚨 Broadcast:", data);

    io.emit("receive-alert", data);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client Disconnected");
  });
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
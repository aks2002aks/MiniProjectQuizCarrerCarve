// server.js

const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());

const connectDatabase = require("./database");

// Connect to MongoDB
connectDatabase();

// Import routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const welcomeRoutes = require("./routes/welcomeRoutes");

// Middleware
app.use(express.json());

// Routes
app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", testRoutes);
app.use("/api", welcomeRoutes);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;

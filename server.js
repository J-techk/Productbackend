const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./route/user.route.js");
const productRoutes = require("./route/product.route.js");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello Christian! Your server is running.");
});

app.use("/api/auth", userRoutes);
app.use("/api/product", productRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://chrischinedu186_db_user:vJMRdIGEl1rUnZwM@cluster0.uvf2jwv.mongodb.net/",
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

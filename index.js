const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");

require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

/// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/// Routes
app.use("/api/v1/auth", authRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`App running on port ${PORT}!`);
});

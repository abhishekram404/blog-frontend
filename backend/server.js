const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  bodyParser.json({
    extended: true,
  })
);

app.use(express.static("../build/"));

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile("index.html");
  });
  return;
}

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/blog", (err) => {
  if (err) {
    console.log("Error connecting to database");
    return;
  }
  console.log("✅  Connected to database");
});

app.use("/api/user", userRoutes);

const port = process.env.PORT || 4000;
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`🚀  SERVER STARTED ON PORT ${port}`);
});

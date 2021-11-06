const express = require("express");
const mongoose = require("mongoose");
const app = express();
// import cors and set localhost:3000 as the origin
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

mongoose.connect("mongodb://localhost/blog", (err) => {
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

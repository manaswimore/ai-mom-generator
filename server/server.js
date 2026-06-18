const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes =
  require("./routes/authRoutes");

const meetingRoutes =
  require("./routes/meetingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.MONGO_URI
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/meetings",
  meetingRoutes
);

app.listen(
  process.env.PORT,
  () => {
    console.log(
      "Server Running"
    );
  }
);
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/User.Routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const { DB_URI, PORT } = process.env;

mongoose
  .connect(DB_URI)
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/v1", authRoute);

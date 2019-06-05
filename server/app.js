require("dotenv").config();
if (!["production", "test", "development"].includes(process.env.NODE_ENV)) {
  process.env.NODE_ENV = "development";
}

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const response = require("./util/response");
const { debugError } = require("./util/debug");

const apiRoutes = require("./routes/index");

const app = express();

if (process.env.NODE_ENV === "development") app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRoutes);
app.use("*", (req, res, next) => {
  res.sendFile("index.html", { root: __dirname + "/public" });
});
app.use((err, req, res, next) => {
  if (err) {
    const data = {
      success: false,
      message: err.message || "Internal Server Error"
    };
    res.status(err.httpCode || 500);
    return res.json(data);
  }
});

process.on("unhandledRejection", err => {
  if (err.message === "Invalid Input") return;
  debugError(err.message);
});

module.exports = app;

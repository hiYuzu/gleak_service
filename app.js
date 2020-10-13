const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const ejs = require("ejs");
const cors = require("cors");
const history = require("connect-history-api-fallback");
const api = require("./routes/api");
const index = require("./routes");
const jwtAuth = require("./jwtAuth");
const app = express();
app.use(
  cors({
    origin: ["http://localhost:8000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.set("views", path.resolve("views"));
app.engine(".html", ejs.__express);
app.set("view engine", "html");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(jwtAuth);
app.use("/", index);
app.use("/api", api);
app.use(express.static(path.resolve("public")));
app.use(history());
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({
      message: err.message,
      code: 401,
    });
  }else{
    console.error(err.stack);
    res.status(err.status || 500).json({
      message: err.message,
      code: err.status,
    });
    next();
  }
});
module.exports = app;

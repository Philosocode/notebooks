const path = require("path");
const express = require("express");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const xssClean = require("xss-clean");

const router = require("./router");
const AppError = require("./utils/AppError.util");
const globalErrorHandler = require("./middlewares/globalErrorHandler.middleware");

const app = express();

// middlewares
app.use(cors());

app.options("*", cors());

// serve static files
app.use(express.static(path.join(__dirname, "public")));

// set security HTTP headers
app.use(helmet());

// limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);

// body parser
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// data sanitization against XSS
app.use(xssClean());

// gzip compression
app.use(compression());

// router
app.use("/api/v1", router);

// handle not found routes
app.all("*", function (req, _, next) {
  // When passing an ARG into `next()`, Express assumes there's an error
  next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

// global error handling MW
app.use(globalErrorHandler);

module.exports = app;

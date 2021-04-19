const path = require("path");
const express = require("express");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const xssClean = require("xss-clean");

const router = require("./router");
const globalErrorHandler = require("./middlewares/global-error-handler.middleware");

const app = express();

// middlewares
app.use(
  cors({
    maxAge: 7200,
  })
);

// serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "build")));

// set security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "default-src": ["'self'", "localhost:*"],
        "frame-src": ["'self'", "https://accounts.google.com"],
        "script-src": ["'self'", "apis.google.com"],
        "img-src": ["'self'", "lh3.googleusercontent.com"],
      },
    },
  })
);

// limit requests from same IP
if (process.env.NODE_ENV === "production") {
  const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
  });

  app.use("/api", limiter);
}

// body parser
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// data sanitization against XSS
app.use(xssClean());

// gzip compression
app.use(compression());

// router
app.use("/api/v1", router);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// global error handling MW
app.use(globalErrorHandler);

module.exports = app;

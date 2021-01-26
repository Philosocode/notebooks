const express = require("express");

const protect = require("./middlewares/protect.middleware");
const googleLogin = require("./handlers/auth/googleLogin");
const getConcepts = require("./handlers/concept/getConcepts.handler");

const router = express.Router();

// Auth
router.post("/auth/google", googleLogin);

// Concepts
router.get("/concepts", protect, getConcepts);

module.exports = router;
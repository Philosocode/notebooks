const express = require("express");

const protect = require("./middlewares/protect.middleware");
const googleLogin = require("./handlers/auth/google-login.handler");
const getConcepts = require("./handlers/concept/get-concepts.handler");

const router = express.Router();

// Auth
router.post("/auth/google", googleLogin);

// Concepts
router.get("/concepts", protect, getConcepts);

module.exports = router;
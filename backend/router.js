const express = require("express");

const protect = require("./middlewares/protect.middleware");
const googleLogin = require("./handlers/auth/google-login.handler");
const getConcepts = require("./handlers/concept/get-concepts.handler");
const addConcept = require("./handlers/concept/add-concept.handler");

const router = express.Router();

/* ======================
   NON-PROTECTED ROUTES
   ====================== */
// Auth
router.post("/auth/google", googleLogin);

/* ======================
   PROTECTED ROUTES
   ====================== */
router.use(protect);

// Concepts
router.route("/concepts")
  .get(getConcepts)
  .post(addConcept)

module.exports = router;
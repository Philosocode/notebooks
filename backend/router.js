const express = require("express");

const protect = require("./middlewares/protect.middleware");

const googleLogin = require("./handlers/auth/google-login.handler");
const getConcepts = require("./handlers/concept/get-concepts.handler");
const addConcept = require("./handlers/concept/add-concept.handler");
const deleteConcept = require("./handlers/concept/delete-concept.handler");

const router = express.Router();

/* ======================
   PUBLIC ROUTES
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

router.route("/concepts/:conceptId")
   .delete(deleteConcept)

module.exports = router;
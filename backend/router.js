const express = require("express");

const protect = require("./middlewares/protect.middleware");

// Auth
const googleLogin = require("./handlers/auth/google-login.handler");

// Concept
const getConcept = require("./handlers/concept/get-concept.handler");
const getConcepts = require("./handlers/concept/get-concepts.handler");
const createConcept = require("./handlers/concept/create-concept.handler");
const deleteConcept = require("./handlers/concept/delete-concept.handler");
const updateConcept = require("./handlers/concept/update-concept.handler");
const createTags = require("./handlers/tag/create-tags.handler");

// Tag
const getTags = require("./handlers/tag/get-tags.handler");
const updateTag = require("./handlers/tag/update-tag.handler");
const deleteTag = require("./handlers/tag/delete-tag.handler");

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
  .post(createConcept)

router.route("/concepts/:conceptId")
   .get(getConcept)
   .patch(updateConcept)
   .delete(deleteConcept)

// Tags
router.route("/tags")
   .get(getTags)
   .post(createTags)

router.route("/tags/:tagId")
   .patch(updateTag)
   .delete(deleteTag)

module.exports = router;
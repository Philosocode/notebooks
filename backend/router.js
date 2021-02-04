const express = require("express");

// Middleware
const protect = require("./middlewares/protect.middleware");
const { conceptExistsMiddleware } = require("./handlers/concept/concept.common");

// Auth
const googleLogin = require("./handlers/auth/google-login.handler");

// Concept
const getConcept = require("./handlers/concept/get-concept.handler");
const getConcepts = require("./handlers/concept/get-concepts.handler");
const createConcept = require("./handlers/concept/create-concept.handler");
const deleteConcept = require("./handlers/concept/delete-concept.handler");
const updateConcept = require("./handlers/concept/update-concept.handler");

// Concept Tags
const getConceptTags = require("./handlers/concept-tag/get-concept-tags.handler");
const createConceptTag = require("./handlers/concept-tag/create-concept-tag.handler");
const deleteConceptTag = require("./handlers/concept-tag/delete-concept-tag.handler");

// Tag
const getTags = require("./handlers/tag/get-tags.handler");
const createTags = require("./handlers/tag/create-tags.handler");
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
   .get(conceptExistsMiddleware, getConcept)
   .patch(conceptExistsMiddleware, updateConcept)
   .delete(conceptExistsMiddleware, deleteConcept)

// Concept Tags
router.route("/concepts/:conceptId/tags")
  .get(conceptExistsMiddleware, getConceptTags)
  .post(conceptExistsMiddleware, createConceptTag)

router.route("/concepts/:conceptId/tags/:tagName")
  .delete(conceptExistsMiddleware, deleteConceptTag)

// Tags
router.route("/tags")
   .get(getTags)
   .post(createTags)

router.route("/tags/:tagId")
   .patch(updateTag)
   .delete(deleteTag)

module.exports = router;
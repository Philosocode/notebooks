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
const getTagsForConcept = require("./handlers/concept-tag/get-tags-for-concept");
const createTagForConcept = require("./handlers/concept-tag/create-tag-for-concept");
const updateTagForConcept = require("./handlers/concept-tag/update-tag-for-concept.handler");
const deleteTagFromConcept = require("./handlers/concept-tag/delete-tag-from-concept.handler");

const getConceptTags = require("./handlers/concept-tag/get-concept-tags.handler");
const updateConceptTag = require("./handlers/concept-tag/update-concept-tag.handler");
const deleteConceptTag = require("./handlers/concept-tag/delete-concept-tag.handler");

// Concept Hooks
const getHook = require("./handlers/hook/get-hook.handler");
const getHooks = require("./handlers/hook/get-hooks.handler");
const createHook = require("./handlers/hook/create-hook.handler");

// Tag
const getTags = require("./handlers/tag/get-tags.handler");
const createTags = require("./handlers/tag/create-tags.handler");
const updateTag = require("./handlers/tag/update-tag.handler");
const deleteTag = require("./handlers/tag/delete-tag.handler");
const deleteHook = require("./handlers/hook/delete-hook.handler");
const deleteHooks = require("./handlers/hook/delete-hooks.handler");

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

// Concept Tags
router.route("/concepts/tags")
  .get(getConceptTags)

router.route("/concepts/tags/:tagName")
  .patch(updateConceptTag)
  .delete(deleteConceptTag)

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
  .get(conceptExistsMiddleware, getTagsForConcept)
  .post(conceptExistsMiddleware, createTagForConcept)

router.route("/concepts/:conceptId/tags/:tagName")
  .patch(conceptExistsMiddleware, updateTagForConcept)
  .delete(conceptExistsMiddleware, deleteTagFromConcept)

// Concept Hooks
router.route("/concepts/:conceptId/hooks")
  .get(conceptExistsMiddleware, getHooks)
  .post(conceptExistsMiddleware, createHook)
  .delete(conceptExistsMiddleware, deleteHooks)

router.route("/concepts/:conceptId/hooks/:hookId")
  .get(conceptExistsMiddleware, getHook)
  .delete(conceptExistsMiddleware, deleteHook)

// Tags
router.route("/tags")
   .get(getTags)
   .post(createTags)

router.route("/tags/:tagId")
   .patch(updateTag)
   .delete(deleteTag)

module.exports = router;
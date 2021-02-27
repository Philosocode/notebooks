const express = require("express");

// Middleware
const protect = require("./middlewares/protect.middleware");
const { entityExistsMiddleware } = require("./middlewares/entity-exists.middleware");

const conceptExistsMiddleware = entityExistsMiddleware("concept");
const materialExistsMiddleware = entityExistsMiddleware("material");

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

// Concept Links
const createConceptLink = require("./handlers/concept-link/create-concept-link.handler");
const deleteConceptLink = require("./handlers/concept-link/delete-concept-link.handler");
const getConceptLink = require("./handlers/concept-link/get-concept-link.handler");
const getConceptLinks = require("./handlers/concept-link/get-concept-links.handler");

const deleteConceptLinksForConcept = require("./handlers/concept-link/delete-concept-links-for-concept.handler");
const getConceptLinksForConcept = require("./handlers/concept-link/get-concept-links-for-concept.handler");

// Materials
const createMaterial = require("./handlers/material/create-material.handler");
const deleteMaterial = require("./handlers/material/delete-material.handler");
const getMaterial = require("./handlers/material/get-material.handler");
const getMaterials = require("./handlers/material/get-materials.handler");
const updateMaterial = require("./handlers/material/update-material.handler");

// Material Tags
const getTagsForMaterial = require("./handlers/material-tag/get-tags-for-material");
const createTagForMaterial = require("./handlers/concept-tag/create-tag-for-concept");
const updateTagForMaterial = require("./handlers/concept-tag/update-tag-for-concept.handler");
const deleteTagFromMaterial = require("./handlers/concept-tag/delete-tag-from-concept.handler");

const getMaterialTags = require("./handlers/material-tag/get-material-tags.handler");
const updateMaterialTag = require("./handlers/concept-tag/update-concept-tag.handler");
const deleteMaterialTag = require("./handlers/concept-tag/delete-concept-tag.handler");


// Tag
const getTags = require("./handlers/tag/get-tags.handler");
const createTags = require("./handlers/tag/create-tags.handler");
const updateTag = require("./handlers/tag/update-tag.handler");
const deleteTag = require("./handlers/tag/delete-tag.handler");
const deleteHook = require("./handlers/hook/delete-hook.handler");
const deleteHooks = require("./handlers/hook/delete-hooks.handler");
const updateHook = require("./handlers/hook/update-hook.handler");

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

// Concept Tags - General
router.route("/concepts/tags")
  .get(getConceptTags)

router.route("/concepts/tags/:tagName")
  .patch(updateConceptTag)
  .delete(deleteConceptTag)

// Concept Links
router.route("/concepts/links")
  .get(getConceptLinks)
  .post(createConceptLink)

router.route("/concepts/links/:linkId")
  .get(getConceptLink)
  .delete(deleteConceptLink);

// Concepts
router.route("/concepts")
  .get(getConcepts)
  .post(createConcept)

router.route("/concepts/:conceptId")
   .get(conceptExistsMiddleware, getConcept)
   .patch(conceptExistsMiddleware, updateConcept)
   .delete(conceptExistsMiddleware, deleteConcept)

router.route("/concepts/:conceptId/links")
  .get(conceptExistsMiddleware, getConceptLinksForConcept)
  .delete(conceptExistsMiddleware, deleteConceptLinksForConcept)

// Concept Tags For Concept
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
  .patch(conceptExistsMiddleware, updateHook)
  .delete(conceptExistsMiddleware, deleteHook)

// Material Tags - General
router.route("/materials/tags")
  .get(getMaterialTags)

router.route("/materials/tags/:tagName")
  .patch(updateConceptTag)
  .delete(deleteConceptTag)

// Materials
router.route("/materials")
  .get(getMaterials)
  .post(createMaterial)

// Material Tags For Material
router.route("/materials/:materialId/tags")
  .get(materialExistsMiddleware, getTagsForMaterial)
  .post(conceptExistsMiddleware, createTagForConcept)

router.route("/materials/:materialId/tags/:tagName")
  .patch(conceptExistsMiddleware, updateTagForConcept)
  .delete(conceptExistsMiddleware, deleteTagFromConcept)


router.route("/materials/:materialId")
  .get(materialExistsMiddleware, getMaterial)
  .patch(materialExistsMiddleware, updateMaterial)
  .delete(materialExistsMiddleware, deleteMaterial)

// Tags
router.route("/tags")
   .get(getTags)
   .post(createTags)

router.route("/tags/:tagId")
   .patch(updateTag)
   .delete(deleteTag)

module.exports = router;
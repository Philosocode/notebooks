const express = require("express");

// Middleware
const protect = require("./middlewares/protect.middleware");
const { entityExistsMiddleware } = require("./middlewares/entity-exists.middleware");
const userOwnsPartMiddleware = require("./middlewares/user-owns-part.middleware");

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
const deleteHook = require("./handlers/hook/delete-hook.handler");
const deleteHooks = require("./handlers/hook/delete-hooks.handler");
const updateHook = require("./handlers/hook/update-hook.handler");

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
const createTagForMaterial = require("./handlers/material-tag/create-tag-for-material");
const updateTagForMaterial = require("./handlers/material-tag/update-tag-for-material.handler");
const deleteTagFromMaterial = require("./handlers/material-tag/delete-tag-from-material.handler");

const getMaterialTags = require("./handlers/material-tag/get-material-tags.handler");
const updateMaterialTag = require("./handlers/material-tag/update-material-tag.handler");
const deleteMaterialTag = require("./handlers/material-tag/delete-material-tag.handler");

// Material Parts
const getParts = require("./handlers/part/get-parts.handler");
const getPart = require("./handlers/part/get-part.handler");
const createPart = require("./handlers/part/create-part.handler");
const updatePart = require("./handlers/part/update-part.handler");
const deletePart = require("./handlers/part/delete-part.handler");
const deleteParts = require("./handlers/part/delete-parts.handler");

// Concept Parts
const createConceptPart = require("./handlers/concept-part/create-concept-part.handler");
const getConceptParts = require("./handlers/concept-part/get-concept-parts.handler");

// Section
const createSection = require("./handlers/section/create-section.handler");
const getSections = require("./handlers/section/get-sections.handler");
const getSection = require("./handlers/section/get-section.handler");
const deleteSections = require("./handlers/section/delete-sections.handler");
const deleteSection = require("./handlers/section/delete-section.handler");
const updateSection = require("./handlers/section/update-section.handler");

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
  .patch(updateMaterialTag)
  .delete(deleteMaterialTag)

// Materials
router.route("/materials")
  .get(getMaterials)
  .post(createMaterial)

// Material Tags For Material
router.route("/materials/:materialId/tags")
  .get(materialExistsMiddleware, getTagsForMaterial)
  .post(materialExistsMiddleware, createTagForMaterial)

router.route("/materials/:materialId/tags/:tagName")
  .patch(materialExistsMiddleware, updateTagForMaterial)
  .delete(materialExistsMiddleware, deleteTagFromMaterial)

// Material Parts
router.route("/materials/:materialId/parts")
  .get(materialExistsMiddleware, getParts)
  .post(materialExistsMiddleware, createPart)
  .delete(materialExistsMiddleware, deleteParts)

// Material Detail
router.route("/materials/:materialId")
  .get(materialExistsMiddleware, getMaterial)
  .patch(materialExistsMiddleware, updateMaterial)
  .delete(materialExistsMiddleware, deleteMaterial)

// Concept Part Links
router.route("/parts/:partId/links")
  .get(userOwnsPartMiddleware, getConceptParts)
  .post(userOwnsPartMiddleware, createConceptPart)

// Sections
router.route("/parts/:partId/sections")
  .get(userOwnsPartMiddleware, getSections)
  .post(userOwnsPartMiddleware, createSection)
  .delete(userOwnsPartMiddleware, deleteSections)

router.route("/parts/:partId/sections/:sectionId")
  .get(userOwnsPartMiddleware, getSection)
  .patch(userOwnsPartMiddleware, updateSection)
  .delete(userOwnsPartMiddleware, deleteSection)

// Parts
router.route("/parts/:partId")
  .get(userOwnsPartMiddleware, getPart)
  .patch(userOwnsPartMiddleware, updatePart)
  .delete(userOwnsPartMiddleware, deletePart);

// Tags
router.route("/tags")
   .get(getTags)
   .post(createTags)

router.route("/tags/:tagId")
   .patch(updateTag)
   .delete(deleteTag)

module.exports = router;
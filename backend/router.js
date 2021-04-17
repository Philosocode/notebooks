const express = require("express");

// Middleware
const protect = require("./middlewares/protect.middleware");
const { entityExistsMiddleware } = require("./middlewares/entity-exists.middleware");
const userOwnsSectionMiddleware = require("./middlewares/user-owns-section.middleware");

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
const createConceptConceptLink = require("./handlers/concept-concept-link/create-concept-concept-link.handler");
const deleteConceptConceptLink = require("./handlers/concept-concept-link/delete-concept-concept-link.handler");
const getConceptConceptLink = require("./handlers/concept-concept-link/get-concept-concept-link.handler");
const getConceptConceptLinks = require("./handlers/concept-concept-link/get-concept-concept-links.handler");

const deleteConceptConceptLinksForConcept = require("./handlers/concept-concept-link/delete-concept-concept-links-for-concept.handler");
const getConceptConceptLinksForConcept = require("./handlers/concept-concept-link/get-concept-concept-links-for-concept.handler");
const getConceptsForMaterial = require("./handlers/material/get-concepts-for-material.handler");

// Materials
const createMaterial = require("./handlers/material/create-material.handler");
const deleteMaterial = require("./handlers/material/delete-material.handler");
const getMaterial = require("./handlers/material/get-material.handler");
const getMaterials = require("./handlers/material/get-materials.handler");
const updateMaterial = require("./handlers/material/update-material.handler");

const getFlashcardsForMaterial = require("./handlers/material/get-flashcards-for-material.handler");
const getFlashcardsForSection = require("./handlers/section/get-flashcards-for-section.handler");

// Material Tags
const getTagsForMaterial = require("./handlers/material-tag/get-tags-for-material");
const createTagForMaterial = require("./handlers/material-tag/create-tag-for-material");
const updateTagForMaterial = require("./handlers/material-tag/update-tag-for-material.handler");
const deleteTagFromMaterial = require("./handlers/material-tag/delete-tag-from-material.handler");

const getMaterialTags = require("./handlers/material-tag/get-material-tags.handler");
const updateMaterialTag = require("./handlers/material-tag/update-material-tag.handler");
const deleteMaterialTag = require("./handlers/material-tag/delete-material-tag.handler");

// Material Sections
const getSections = require("./handlers/section/get-sections.handler");
const getSection = require("./handlers/section/get-section.handler");
const createSection = require("./handlers/section/create-section.handler");
const updateSection = require("./handlers/section/update-section.handler");
const deleteSection = require("./handlers/section/delete-section.handler");
const deleteSections = require("./handlers/section/delete-sections.handler");

// Concept Sections
const createConceptSectionLink = require("./handlers/concept-section-link/create-concept-section-link.handler");
const getConceptSectionLinks = require("./handlers/concept-section-link/get-concept-section-links.handler");
const deleteConceptSectionLink = require("./handlers/concept-section-link/delete-concept-section-link.handler");

// Flashcards
const createFlashcard = require("./handlers/flashcard/create-flashcard.handler");
const getFlashcards = require("./handlers/flashcard/get-flashcards.handler");
const getFlashcardsForUser = require("./handlers/flashcard/get-flashcards-for-user.handler");
const updateFlashcard = require("./handlers/flashcard/update-flashcard.handler");
const deleteFlashcard = require("./handlers/flashcard/delete-flashcard.handler");
const deleteFlashcards = require("./handlers/flashcard/delete-flashcards.handler");

// Note
const createNote = require("./handlers/note/create-note.handler");
const getNotes = require("./handlers/note/get-notes.handler");
const getNote = require("./handlers/note/get-note.handler");
const deleteNotes = require("./handlers/note/delete-notes.handler");
const deleteNote = require("./handlers/note/delete-note.handler");
const updateNote = require("./handlers/note/update-note.handler");

// Tag
const getTags = require("./handlers/tag/get-tags.handler");
const createTags = require("./handlers/tag/create-tags.handler");
const updateTag = require("./handlers/tag/update-tag.handler");
const deleteTag = require("./handlers/tag/delete-tag.handler");

// User
const getUser = require("./handlers/user/get-user.handler");
const updateUser = require("./handlers/user/update-user.handler");

// Uploads
const uploadImageHandler = require("./handlers/upload/upload-image.handler");
const { uploadImage, resizeImage } = require("./middlewares/upload-image.middleware");

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

// User
router.route("/users/:userId")
  .get(getUser)
  .patch(updateUser)

// Concept Tags - General
router.route("/concepts/tags")
  .get(getConceptTags)

router.route("/concepts/tags/:tagName")
  .patch(updateConceptTag)
  .delete(deleteConceptTag)

// Concept Links
router.route("/concepts/links")
  .get(getConceptConceptLinks)
  .post(createConceptConceptLink)

router.route("/concepts/links/:linkId")
  .get(getConceptConceptLink)
  .delete(deleteConceptConceptLink);

// Concepts
router.route("/concepts")
  .get(getConcepts)
  .post(createConcept)

router.route("/concepts/:conceptId")
   .get(conceptExistsMiddleware, getConcept)
   .patch(conceptExistsMiddleware, updateConcept)
   .delete(conceptExistsMiddleware, deleteConcept)

router.route("/concepts/:conceptId/links")
  .get(conceptExistsMiddleware, getConceptConceptLinksForConcept)
  .delete(conceptExistsMiddleware, deleteConceptConceptLinksForConcept)

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

router.route("/materials/:materialId/concepts")
  .get(materialExistsMiddleware, getConceptsForMaterial)

router.route("/materials/:materialId/flashcards")
  .get(materialExistsMiddleware, getFlashcardsForMaterial)

// Material Sections
router.route("/materials/:materialId/sections")
  .get(materialExistsMiddleware, getSections)
  .post(materialExistsMiddleware, createSection)
  .delete(materialExistsMiddleware, deleteSections)

// Material Detail
router.route("/materials/:materialId")
  .get(materialExistsMiddleware, getMaterial)
  .patch(materialExistsMiddleware, updateMaterial)
  .delete(materialExistsMiddleware, deleteMaterial)

// Concept Section Links
router.route("/sections/:sectionId/links")
  .get(userOwnsSectionMiddleware, getConceptSectionLinks)
  .post(userOwnsSectionMiddleware, createConceptSectionLink)

router.route("/sections/:sectionId/flashcards")
  .get(userOwnsSectionMiddleware, getFlashcardsForSection)

router.route("/sections/:sectionId/links/:conceptId")
  .delete(userOwnsSectionMiddleware, conceptExistsMiddleware, deleteConceptSectionLink)

// Section Flashcards
router.route("/flashcards")
  .get(getFlashcardsForUser)

router.route("/sections/:sectionId/flashcards")
  .get(userOwnsSectionMiddleware, getFlashcards)
  .post(userOwnsSectionMiddleware, createFlashcard)
  .delete(userOwnsSectionMiddleware, deleteFlashcards)

router.route("/sections/:sectionId/flashcards/:flashcardId")
  .patch(updateFlashcard)
  .delete(deleteFlashcard)

// Notes
router.route("/sections/:sectionId/notes")
  .get(userOwnsSectionMiddleware, getNotes)
  .post(userOwnsSectionMiddleware, createNote)
  .delete(userOwnsSectionMiddleware, deleteNotes)

router.route("/sections/:sectionId/notes/:noteId")
  .get(userOwnsSectionMiddleware, getNote)
  .patch(userOwnsSectionMiddleware, updateNote)
  .delete(userOwnsSectionMiddleware, deleteNote)

// Sections
router.route("/sections/:sectionId")
  .get(userOwnsSectionMiddleware, getSection)
  .patch(userOwnsSectionMiddleware, updateSection)
  .delete(userOwnsSectionMiddleware, deleteSection);

// Tags
router.route("/tags")
   .get(getTags)
   .post(createTags)

router.route("/tags/:tagId")
   .patch(updateTag)
   .delete(deleteTag)

// Uploads
router.route("/images")
  .post(uploadImage, resizeImage, uploadImageHandler)

module.exports = router;
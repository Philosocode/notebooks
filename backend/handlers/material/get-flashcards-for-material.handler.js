const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getFlashcardsForMaterial } = require("../../models/material.model");

module.exports = catchAsync(async function (req, res) {
  const { materialId } = req.params;

  let mastered;
  if (req.query.mastered) {
    if (req.query.mastered === "true") {
      mastered = true;
    } else if (req.query.mastered === "false") {
      mastered = false;
    }
  }

  const flashcardsForMaterial = await getFlashcardsForMaterial(materialId, mastered);

  sendResponse(res, 200, { flashcards: flashcardsForMaterial });
});

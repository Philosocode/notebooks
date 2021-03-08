const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { getMaterialLinksForConcept } = require("../../models/concept-link.model");

module.exports = catchAsync(async function (req, res) {
  const { conceptId } = req.params;

  const materialLinksRaw = await getMaterialLinksForConcept(conceptId);
  const materialLinks = materialLinksRaw.map(materialLink => materialLink.id);

  sendResponse(res, 200, { materialLinks });
});

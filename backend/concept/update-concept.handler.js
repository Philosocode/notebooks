const sendResponse = require("../handlers/response.handler");
const catchAsync = require("../middlewares/catch-async.middleware");
const { updateConcept } = require("./concept.model");

module.exports = catchAsync(async function (req, res) {
  const { conceptId } = req.params;

  const { name, tags } = req.body;

  // ensure tags are lowercase
  const lowercaseTags = tags?.map(tn => tn.trim().toLowerCase());

  await updateConcept(conceptId, { name, tags: lowercaseTags });

  sendResponse(res, 204);
});

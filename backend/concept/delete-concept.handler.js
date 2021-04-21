const sendResponse = require("../handlers/response.handler");
const catchAsync = require("../middlewares/catch-async.middleware");
const { deleteConcept } = require("./concept.model");

module.exports = catchAsync(async function (req, res, next) {
  const userId = req.user.id;
  const { conceptId } = req.params;

  await deleteConcept(userId, conceptId);

  sendResponse(res, 204);
});
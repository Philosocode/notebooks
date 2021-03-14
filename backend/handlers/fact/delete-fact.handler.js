const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { deleteFact  } = require("../../models/fact.model");
const { entityExists } = require("../../models/common.model");
const AppError = require("../../utils/app-error.util");

module.exports = catchAsync(async function (req, res, next) {
  const { partId, factId } = req.params;

  // validations
  if (!partId) return next(new AppError("Please include a part ID.", 422));
  if (!factId) return next(new AppError("Please include a fact ID.", 422));

  const exists = await entityExists("fact", { part_id: partId, id: factId });
  if (!exists) return next(new AppError("Fact with that ID not found.", 404));

  await deleteFact(factId);

  sendResponse(res, 204);
});
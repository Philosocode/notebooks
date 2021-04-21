const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { createNotebook } = require("../../models/notebook.model");
const { entityExists } = require("../../common/common.model");

module.exports = catchAsync(async function (req, res, next) {
  const userId = req.user.id;
  const { name, tags } = req.body;

  // Validations: name not empty, notebook with that name doesn't already exist
  if (!name.trim()) {
    return next(new AppError("Must include a name when adding a notebook", 422));
  }

  const exists = await entityExists("notebook", { name, user_id: userId });
  if (exists) {
    return next(new AppError("Notebook with that name already exists", 409));
  }

  const createdNotebook = await createNotebook(userId, name, tags);

  sendResponse(res, 201, {
    notebook: createdNotebook
  });
});

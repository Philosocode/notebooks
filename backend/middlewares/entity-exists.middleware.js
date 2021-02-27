const AppError = require("../utils/app-error.util");
const catchAsync = require("./catch-async.middleware");
const { capitalizeFirstLetter } = require("../utils/string.util");
const { entityExists } = require("../models/common.model");

// Ensure an entity for request parameter exists
// - must use `entityId` as the request parameter
// entity must have an associated user_id
exports.entityExistsMiddleware = function entityExistsMiddleware(tableName) {
  const tableNameCapitalized = capitalizeFirstLetter(tableName);

  return catchAsync(async function (req, _, next) {
    console.log(tableName);
    const userId = req.user.id;
    const entityId = req.params[tableName + "Id"];

    if (!entityId) {
      return next(new AppError(`${tableNameCapitalized} ID is required.`, 422));
    }

    const exists = await entityExists(tableName, { id: entityId, user_id: userId });
    if (!exists) {
      return next(new AppError(`${tableNameCapitalized} with that ID not found.`, 404));
    }
    return next();
  })
}
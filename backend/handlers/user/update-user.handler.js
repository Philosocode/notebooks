const AppError = require("../../utils/app-error.util");
const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");
const { settingsKeys, defaultSettings } = require("./user.common");
const { updateUserSettings } = require("../../models/user.model");

module.exports = catchAsync(async function (req, res, next) {
  const { settings } = req.body;
  const userId = req.user.id;

  if (!settings) {
    return next(
      new AppError("Allowed properties for update: settings")
    );
  }

  if (settings && typeof(settings) !== "object") {
    return next(new AppError("Settings must be an object.", 422));
  }

  // clean settings
  const cleanedSettings = {};
  Object.keys(settings).forEach(key => {
    // if key not in settings keys, ignore
    if (!settingsKeys.includes(key)) return;

    // invalid type
    if (
      typeof(settings[key]) !== typeof(defaultSettings[key])
    ) return;

    cleanedSettings[key] = settings[key];
  });

  if (Object.keys(cleanedSettings).length === 0) {
    return next(new AppError("Invalid settings.", 422));
  }

  await updateUserSettings(userId, cleanedSettings);

  sendResponse(res, 204);
});

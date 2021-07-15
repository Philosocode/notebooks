const { RES_SUCCESS, RES_FAIL } = require("../shared/constants.shared");

exports.sendResponse = function(res, statusCode, data, message) {
  let status = RES_SUCCESS;
  if (statusCode >= 400 && statusCode < 600) status = RES_FAIL;

  const returnData = {
    status,
    // conditionally add `message` and `data` properties if passed
    ...(data && { data }),
    ...(message && { message }),
  };

  res.status(statusCode).json(returnData);
};

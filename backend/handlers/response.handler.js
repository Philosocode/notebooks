const { RES_SUCCESS } = require("../shared/constants.shared");

module.exports = function responseHandler(res, statusCode, data, message) {
  const returnData = {
    status: RES_SUCCESS,
    // conditionally add `message` and `data` properties if passed
    ...(data && { data }),
    ...(message && { message }),
  };

  res.status(statusCode).json(returnData);
};

const { RES_SUCCESS } = require("../shared/constants.shared");

module.exports = function responseHandler(res, data) {
  res.send({
    status: RES_SUCCESS,
    data: data
  });
};

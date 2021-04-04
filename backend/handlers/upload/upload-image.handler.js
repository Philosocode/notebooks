const sendResponse = require("../response.handler");
const catchAsync = require("../../middlewares/catch-async.middleware");

module.exports = catchAsync(async function (req, res) {
  if (req.file) {    
    sendResponse(res, 201, { imageUrl: req.file.filename });
  } else {
    sendResponse(res, 404);
  }
});

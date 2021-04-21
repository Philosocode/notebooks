const sendResponse = require("../handlers/response.handler");
const catchAsync = require("../middlewares/catch-async.middleware");
const { createConcept } = require("./concept.model");

module.exports = catchAsync(async function (req, res) {
  const userId = req.user.id;
  const { name, tags } = req.body;

  const createdConcept = await createConcept(userId, name, tags);

  sendResponse(res, 201, {
    concept: createdConcept 
  });
});

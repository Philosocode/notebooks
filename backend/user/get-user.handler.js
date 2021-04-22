const { getUser } = require("./user.model");
const sendResponse = require("../handlers/response.handler");

module.exports = async function (req, res) {
  const userId = req.user.id;

  const user = await getUser(userId);

  sendResponse(res, 200, { user });
};
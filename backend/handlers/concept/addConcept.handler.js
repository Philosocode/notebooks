const sendResponse = require("../response.handler");

module.exports = async function addConcept(req, res) {
  sendResponse(res, { concepts: []});
};

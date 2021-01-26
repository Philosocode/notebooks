const { getConceptsForUser } = require("../../models/concept.model");
const sendResponse = require("../response.handler");

module.exports = async function getConcepts(req, res) {
  const userId = req.user.id;
  const concepts = await getConceptsForUser(userId);

  sendResponse(res, {
    concepts
  });
};

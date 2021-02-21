const db = require("../db/db");

module.exports = {
  createConceptLink,
};

async function createConceptLink(concept1_id, concept2_id, connection=db) {
  return connection("concept_link").insert({ concept1_id, concept2_id }).returning("*");
}

/* HELPER FUNCTIONS */

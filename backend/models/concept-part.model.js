const db = require("../db/db");

module.exports = {
  conceptPartExists,
  createConceptPart,
  deleteConceptLink,
  getConceptLinks,

  deleteConceptLinksForConcept,
  getConceptLinksForConcept,
};

async function conceptPartExists(concept_id, part_id, connection=db) {
  const res = await connection.first(
    connection.raw(
      "exists ? as exists",
      connection("concept_part")
        .select("concept_id")
        .where({ concept_id, part_id })
    )
  );

  return res.exists;
}

async function createConceptPart(concept_id, part_id, connection=db) {
  return connection("concept_part")
    .insert({ concept_id, part_id })
    .returning("*");
}

async function deleteConceptLink(link_id, connection = db) {
  return connection("concept_link")
    .where({ id: link_id })
    .del();
}

async function deleteConceptLinksForConcept(concept_id, connection = db) {
  return connection("concept_link")
    .where({ concept1_id: concept_id })
    .orWhere({ concept2_id: concept_id })
    .del();
}

async function getConceptLinksForConcept(concept_id, connection = db) {
  return connection("concept_link")
    .where({ concept1_id: concept_id })
    .orWhere({ concept2_id: concept_id });
}

async function getConceptLinks(user_id, filterObj, connection = db) {
  return connection("concept_link")
    .where({ ...filterObj })
    .whereIn("concept1_id", function() {
      this.select("id").from("concept").where({ user_id });
    })
    .whereIn("concept2_id", function() {
      this.select("id").from("concept").where({ user_id });
    });
}
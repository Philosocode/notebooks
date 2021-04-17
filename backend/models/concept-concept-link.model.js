const db = require("../db/db");

module.exports = {
  conceptConceptLinkExists,
  createConceptConceptLink,
  deleteConceptConceptLink,
  getConceptConceptLinks,

  deleteConceptConceptLinksForConcept,
  getConceptConceptLinksForConcept,
  getMaterialLinksForConcept,
};

async function conceptConceptLinkExists(concept_ids, connection=db) {
  const res = await connection.first(
    connection.raw(
      "exists ? as exists",
      connection("concept_concept_link")
        .select("id")
        .whereIn("concept1_id", concept_ids)
        .whereIn("concept2_id", concept_ids)
    )
  );

  return res.exists;
}

async function createConceptConceptLink(concept_ids, connection=db) {
  return connection("concept_concept_link")
    .insert({ concept1_id: concept_ids[0], concept2_id: concept_ids[1] })
    .returning("*");
}

async function deleteConceptConceptLink(link_id, connection=db) {
  return connection("concept_concept_link")
    .where({ id: link_id })
    .del();
}

async function deleteConceptConceptLinksForConcept(concept_id, connection=db) {
  return connection("concept_concept_link")
    .where({ concept1_id: concept_id })
    .orWhere({ concept2_id: concept_id })
    .del();
}

async function getConceptConceptLinksForConcept(concept_id, connection=db) {
  return connection("concept_concept_link")
    .where({ concept1_id: concept_id })
    .orWhere({ concept2_id: concept_id });
}

async function getConceptConceptLinks(user_id, filterObj, connection=db) {
  return connection("concept_concept_link")
    .where({ ...filterObj })
    .whereIn("concept1_id", function() {
      this.select("id").from("concept").where({ user_id });
    })
    .whereIn("concept2_id", function() {
      this.select("id").from("concept").where({ user_id });
    });
}

async function getMaterialLinksForConcept(concept_id, connection=db) {
  return connection("concept_section")
    .select("material.id")
    .join("section", "section.id", "concept_section.section_id")
    .join("material", "material.id", "section.material_id")
    .where({ "concept_section.concept_id": concept_id });
}
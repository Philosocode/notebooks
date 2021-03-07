const db = require("../db/db");

module.exports = {
  conceptPartExists,
  createConceptPart,
  deleteConceptPart,
  deleteConceptPartsForPart,
  getConceptPartsForPart,
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

async function deleteConceptPart(concept_id, part_id, connection = db) {
  return connection("concept_part")
    .where({ concept_id, part_id })
    .del();
}

async function deleteConceptPartsForPart(part_id, connection=db) {
  return connection("concept_part")
    .where({ part_id })
    .del();
}

async function getConceptPartsForPart(part_id, connection=db) {
  return connection("concept_part")
    .where({ part_id });
}
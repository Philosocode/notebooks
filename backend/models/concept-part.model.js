const db = require("../db/db");

module.exports = {
  conceptPartExists,
  createConceptPart,
  deleteConceptPart,
  deleteConceptPartsForPart,
  deleteConceptPartsForMaterial,
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

async function deleteConceptPartsForMaterial(material_id, connection=db) {
  // delete where concept_part.part_id is in...
  return connection("concept_part").whereIn("part_id", function() {
    // select parts with the material ID
    this.select("id")
      .from("part")
      .where({ "part.material_id": material_id });
  }).del();
}
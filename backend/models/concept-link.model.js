const db = require("../db/db");

module.exports = {
  conceptLinkExists,
  createConceptLink,
};

async function conceptLinkExists(concept_ids, link_id, connection = db) {
  const res = await connection.first(
    connection.raw(
      "exists ? as exists",
      connection("concept_link")
        .select("id")
        .whereIn("concept1_id", concept_ids)
        .whereIn("concept2_id", concept_ids)
    )
  );

  return res.exists;
}

async function createConceptLink(concept_ids, connection = db) {
  return connection("concept_link")
    .insert({ concept1_id: concept_ids[0], concept2_id: concept_ids[1] })
    .returning("*");
}

/* HELPER FUNCTIONS */
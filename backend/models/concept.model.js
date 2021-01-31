const db = require("../db/db");

module.exports = {
  conceptExists,
  createConcept,
  deleteConcept,
  getConcept,
  getConcepts,
  updateConcept,
};

async function conceptExists(user_id, filterObj) {
  const res = await db.first(
    db.raw(
      "exists ? as exists",
      db("concept").select("id").where({ ...filterObj, user_id })
    )
  );
  
  return res.exists;
}

async function createConcept(user_id, name, tagNames) {
  return await db.transaction(async (trx) => {
    const [createdConcept] = await trx("concept").insert({ name, user_id }, [
      "id",
      "name",
      "created_at",
    ]);

    if (tagNames === undefined || tagNames.length == 0) return createdConcept;

    // Create tags for concept
    // ["a", "b"] -> [ {name: "a"}, {name: "b"} ]
    const tagObjs = tagNames.map((tagName) => ({ name: tagName }));
    await trx("tag").insert(tagObjs).onConflict("name").ignore();

    // Get tags for tagNames from DB
    const tagsFromDb = await trx("tag").whereIn("name", tagNames);

    // Link each tag to the new concept
    const conceptTagLinks = tagsFromDb.map((t) => ({
      concept_id: createdConcept.id,
      tag_id: t.id,
    }));

    await trx("concept_tag").insert(conceptTagLinks);

    return {
      ...createdConcept,
      tags: tagNames,
    };
  });
}

async function deleteConcept(filterObj) {
  return db("concept").where(filterObj).del();
}

async function getConcept(user_id, filterObj) {
  return db("concept")
    .join("concept_tag", "concept.id", "concept_tag.concept_id")
    .join("tag", "tag.id", "concept_tag.tag_id")
    .select(
      "concept.id",
      "concept.name",
      "concept.created_at",
      "concept.updated_at",
      "tag.name AS tag"
    )
    .where({ ...filterObj, user_id })
    .first();
}

async function getConcepts(user_id, filterObj) {
  return db("concept")
    .join("concept_tag", "concept.id", "concept_tag.concept_id")
    .join("tag", "tag.id", "concept_tag.tag_id")
    .select(
      "concept.id",
      "concept.name",
      "concept.created_at",
      "concept.updated_at",
      "tag.name AS tag"
    )
    .where({ ...filterObj, user_id });
}

async function updateConcept(filterObj, updates) {
  return db("concept").where(filterObj).update(updates);
}

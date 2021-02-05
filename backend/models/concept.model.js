const db = require("../db/db");
const {
  addTagsToConcept,
  deleteUnreferencedConceptTags,
  updateTagsForConcept,
} = require("./concept-tag.model");

module.exports = {
  conceptExists,
  createConcept,
  deleteConcept,
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
      "updated_at",
    ]);

    if (tagNames === undefined || tagNames.length == 0) return createdConcept;

    await addTagsToConcept(trx, createdConcept.id, tagNames);

    return {
      ...createdConcept,
      tags: tagNames,
    };
  });
}

async function deleteConcept(user_id, id) {
  return await db.transaction(async (trx) => {
    // delete all tags for concept
    await trx("concept_tag").where({ concept_id: id }).del();

    // delete unreferenced tags
    await deleteUnreferencedConceptTags(trx);

    // delete concept itself
    await trx("concept").where({ user_id, id }).first().del();
  });
}

async function getConcepts(user_id, options) {
  const columnsToSelect = ["concept.id", "concept.name", "concept.created_at", "concept.updated_at"];
  if (options.include?.tags) columnsToSelect.push("tag.name AS tag");

  let query = db("concept").select(...columnsToSelect).where({ ...options.filter, user_id });

  if (options.include?.tags) {
    query = query
      .leftJoin("concept_tag", "concept.id", "concept_tag.concept_id")
      .leftJoin("tag", "tag.id", "concept_tag.tag_id")
  }

  return query;
}

async function updateConcept(id, updates) {
  const { name, tags: updatedTags } = updates;

  return await db.transaction(async (trx) => {
    if (name) {
      await trx("concept").where({ id }).update({ name });
    }

    if (updatedTags) {
      await updateTagsForConcept(trx, id, updatedTags);
    }
  });
}
const db = require("../db/db");
const { deleteUnreferencedTags } = require("./tag.model");
const { getTagsDiff } = require("../handlers/tag/tag.common");
const mergeEntityWithTagsAndLinks = require("../utils/merge-entity-tags-links.util");

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

async function getConcepts(user_id, filterObj) {
  return db("concept")
    .select(
      "concept.id",
      "concept.name",
      "concept.created_at",
      "concept.updated_at",
      "tag.name AS tag"
    )
    .leftJoin("concept_tag", "concept.id", "concept_tag.concept_id")
    .leftJoin("tag", "tag.id", "concept_tag.tag_id")
    .where({ ...filterObj, user_id });
}

async function updateConcept(id, updates) {
  const { name, tags: updatedTags } = updates;

  return await db.transaction(async (trx) => {
    if (name) {
      await trx("concept").where({ id }).update({ name });
    }

    if (updatedTags) {
      await updateConceptTags(trx, id, updatedTags);
    }
  });
}

/* HELPER FUNCTIONS */
async function updateConceptTags(connection, id, updatedTags) {
  // get tags for concept as an array of strings
  const currTags = await getTagsForConcept(connection, id);
  const { tagsToCreate, tagsToDelete } = getTagsDiff(currTags, updatedTags);
  if (tagsToCreate.length > 0) await addTagsToConcept(connection, id, tagsToCreate);
  if (tagsToDelete.length > 0) await deleteTagsFromConcept(connection, id, tagsToDelete);
}

async function getTagsForConcept(connection, id) {
  const tagsFlat = await connection("concept_tag")
    .join("tag", "tag.id", "concept_tag.tag_id")
    .select("name AS tag")
    .where("concept_tag.concept_id", id);

  return mergeEntityWithTagsAndLinks(tagsFlat)[0].tags;
}

async function addTagsToConcept(connection, id, tagNames) {
  // Create tag OBJs with `name` property for insertion
  // ["a", "b"] -> [ {name: "a"}, {name: "b"} ]
  const tagObjs = tagNames.map((tagName) => ({ name: tagName }));
  await connection("tag").insert(tagObjs).onConflict("name").ignore();

  // Get tags for tagNames from DB
  const tagsFromDb = await connection("tag").whereIn("name", tagNames);

  // Link each tag to the new concept
  const conceptTagLinks = tagsFromDb.map((t) => ({
    concept_id: id,
    tag_id: t.id,
  }));

  await connection("concept_tag").insert(conceptTagLinks);
}

async function deleteTagsFromConcept(connection, id, tagNames) {
  // get IDs of tag names to delete
  const tagIdsToDeleteFlat = await connection("tag")
    .select("name", "id")
    .whereIn("name", tagNames);

  const tagIdsToDelete = tagIdsToDeleteFlat.map(t => t.id);

  // remove these tags from concept_tag
  await connection("concept_tag")
    .where({"concept_tag.concept_id": id })
    .whereIn("concept_tag.tag_id", tagIdsToDelete)
    .del();

  // delete unreferenced tags
  await deleteUnreferencedConceptTags(connection);
}

async function deleteUnreferencedConceptTags(connection) {
  await connection("tag").whereNotExists(function() {
    this.select("tag_id").from("concept_tag").whereRaw("concept_tag.tag_id = tag.id")
  }).del();
}
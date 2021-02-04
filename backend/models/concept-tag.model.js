const db = require("../db/db");

module.exports = {
  conceptTagExists,
  createConceptTag,
  deleteConceptTag,
  getConceptTags,
  updateConceptTag,

  // Helpers
  addTagsToConcept,
  deleteTagsFromConcept,
  deleteUnreferencedConceptTags,
}

async function getConceptTags(id) {
  return db("concept_tag")
    .select("tag.name AS tag")
    .join("tag", "concept_tag.tag_id", "tag.id")
    .where({ "concept_tag.concept_id": id });
}

async function createConceptTag(id, tag) {
  await addTagsToConcept(db, id, [tag]);
}

async function deleteConceptTag(id, tag) {
  await deleteTagsFromConcept(db, id, [tag]);
}

async function updateConceptTag(id, oldName, newName) {
  return db.transaction(async trx => {
    // remove the old one
    await deleteTagsFromConcept(trx, id, [oldName])

    // add the tag
    await addTagsToConcept(trx, id, [newName]);
  })
}

/* HELPER FUNCTIONS */
async function conceptTagExists(id, tag) {
  const res = await db.first(
    db.raw(
      "exists ? as exists",
      db("concept_tag")
        .join("tag", "tag.id", "concept_tag.tag_id")
        .where({ "concept_tag.concept_id": id, "tag.name": tag })
    )
  );

  return res.exists;
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
    .where({ "concept_tag.concept_id": id })
    .whereIn("concept_tag.tag_id", tagIdsToDelete)
    .del();

  // delete unreferenced tags
  await deleteUnreferencedConceptTags(connection);
}

async function deleteUnreferencedConceptTags(connection) {
  await connection("tag").whereNotExists(function () {
    this.select("tag_id").from("concept_tag").whereRaw("concept_tag.tag_id = tag.id")
  }).del();
}

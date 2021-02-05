const db = require("../db/db");
const mergeEntityWithTagsAndLinks = require("../utils/merge-entity-tags-links.util");
const { getTagsDiff } = require("../handlers/tag/tag.common");

module.exports = {
  conceptHasTag,
  createTagForConcept,
  deleteConceptTag,
  deleteTagFromConcept,
  getConceptTags,
  getTagsForConcept,
  updateTagForConcept,

  // Helpers
  addTagsToConcept,
  deleteUnreferencedConceptTags,
  removeTagsFromConcept,
  updateTagsForConcept,
};

async function getConceptTags(user_id) {
  const tagsFlat = await db("concept_tag")
    .select("tag.name AS tag")
    .join("tag", "tag.id", "concept_tag.tag_id")
    .join("concept", "concept.id", "concept_tag.concept_id")
    .where({ "concept.user_id": user_id });

  return mergeEntityWithTagsAndLinks(tagsFlat);
}

async function getTagsForConcept(id) {
  const tagsFlat = await db("concept_tag")
    .select("tag.name AS tag")
    .join("tag", "concept_tag.tag_id", "tag.id")
    .where({ "concept_tag.concept_id": id });

  return mergeEntityWithTagsAndLinks(tagsFlat)[0]?.tags ?? [];
}

async function createTagForConcept(id, tag) {
  await addTagsToConcept(db, id, [tag]);
}

async function deleteConceptTag(connection, user_id, tagName) {
  await db.transaction(async (trx) => {
    // get tag name and ID
    const tagArr = await trx("tag").select("id").where({ name: tagName });
    const tagIdToDelete = tagArr[0].id;

    await trx("concept_tag")
      .where({ "concept_tag.tag_id": tagIdToDelete })
      .whereIn("concept_tag.concept_id", function () {
        this.select("concept.id")
          .from("concept")
          .where({ "concept.user_id": user_id });
      })
      .del();
  });
}

async function deleteTagFromConcept(id, tag) {
  await removeTagsFromConcept(db, id, [tag]);
}

async function updateTagForConcept(id, oldName, newName) {
  return db.transaction(async (trx) => {
    // remove the old one
    await removeTagsFromConcept(trx, id, [oldName]);

    // add the tag
    await addTagsToConcept(trx, id, [newName]);
  });
}

/* HELPER FUNCTIONS */
async function conceptHasTag(id, tag) {
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

async function removeTagsFromConcept(connection, id, tagNames) {
  // get IDs of tag names to delete
  const tagIdsToDeleteFlat = await connection("tag")
    .select("name", "id")
    .whereIn("name", tagNames);

  const tagIdsToDelete = tagIdsToDeleteFlat.map((t) => t.id);

  // remove these tags from concept_tag
  await connection("concept_tag")
    .where({ "concept_tag.concept_id": id })
    .whereIn("concept_tag.tag_id", tagIdsToDelete)
    .del();

  // delete unreferenced tags
  await deleteUnreferencedConceptTags(connection);
}

async function deleteUnreferencedConceptTags(connection) {
  await connection("tag")
    .whereNotExists(function () {
      this.select("tag_id")
        .from("concept_tag")
        .whereRaw("concept_tag.tag_id = tag.id");
    })
    .del();
}

async function updateTagsForConcept(connection, id, updatedTags) {
  // get tags for concept as an array of strings
  const currTags = await getTagsForConcept(id);
  const { tagsToCreate, tagsToDelete } = getTagsDiff(currTags, updatedTags);

  if (tagsToCreate.length > 0)
    await addTagsToConcept(connection, id, tagsToCreate);
  if (tagsToDelete.length > 0)
    await removeTagsFromConcept(connection, id, tagsToDelete);
}

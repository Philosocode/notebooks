const db = require("../db/db");
const { getTagsDiff } = require("../handlers/tag/tag.common");

module.exports = {
  conceptHasTag,
  createTagForConcept,
  deleteConceptTag,
  deleteTagFromConcept,
  getConceptTags,
  getTagsForConcept,
  updateConceptTag,
  updateTagForConcept,

  // Helpers
  addTagsToConcept,
  conceptTagExists,
  deleteUnreferencedConceptTags,
  removeTagsFromConcept,
  updateTagsForConcept,
};

async function conceptTagExists(user_id, tagName, connection=db) {
  const tagArr = await connection("tag").where({ name: tagName });
  const tag = tagArr[0];

  const res = await db.first(
    db.raw(
      "exists ? as exists",
      db("concept_tag")
        // concept_tag with tagName exists
        .where({ tag_id: tag.id })
        // and it's attached to a concept belonging to the user
        .whereIn("concept_id", function() {
          this.select("id").from("concept").where({ user_id });
        })
    )
  );
  
  return res.exists;
}

async function getConceptTags(user_id) {
  return db("concept_tag")
    .select("tag.name AS tag")
    .join("tag", "tag.id", "concept_tag.tag_id")
    .join("concept", "concept.id", "concept_tag.concept_id")
    .where({ "concept.user_id": user_id });
}

async function getTagsForConcept(concept_id) {
  return db("concept_tag")
    .select("tag.name AS tag")
    .join("tag", "concept_tag.tag_id", "tag.id")
    .where({ "concept_tag.concept_id": concept_id });
}

async function createTagForConcept(concept_id, tag, connection=db) {
  await addTagsToConcept(concept_id, [tag], connection);
}

async function deleteConceptTag(user_id, tagName, connection=db) {
  await connection.transaction(async (trx) => {
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

async function deleteTagFromConcept(concept_id, tag) {
  await removeTagsFromConcept(concept_id, [tag]);
}

async function updateConceptTag(user_id, oldName, newName, connection = db) {
  await connection.transaction(async (trx) => {
    // create new tag in case it doesn't exist
    await trx("tag").insert({ name: newName }).onConflict("name").ignore();

    // get old tag & new tag
    const [oldTag, newTag] = await trx("tag").whereIn("name", [oldName, newName]);
    
    // get concepts with old tag
    const conceptsWithOldTag = await trx("concept_tag")
      .where({ "concept_tag.tag_id": oldTag.id })
      .whereIn("concept_tag.concept_id", function () {
        this.select("concept.id")
          .from("concept")
          .where({ "concept.user_id": user_id });
    });
    const conceptIdsWithOldTag = conceptsWithOldTag.map(ct => ct.concept_id);

    // get concepts with the new tag
    // don't include these when inserting new concept_tag items
    const conceptTagsWithNewTag = await trx("concept_tag")
      .where({ "concept_tag.tag_id": newTag.id })
      .whereIn("concept_tag.concept_id", conceptIdsWithOldTag);

    const conceptIdsWithNewTag = conceptTagsWithNewTag.map(ct => ct.concept_id);

    const conceptIdsWithoutNewTag = conceptIdsWithOldTag.filter(
      id => !conceptIdsWithNewTag.includes(id)
    );
    
    // create concept tags with the new tag
    const conceptTagsToInsert = conceptIdsWithoutNewTag.map(concept_id => {
      return {
        concept_id,
        tag_id: newTag.id,
      }
    });

    // insert new concept tags
    await trx("concept_tag").insert(conceptTagsToInsert);

    // delete old concept tags with old tag ID
    await trx("concept_tag")
      .whereIn("concept_id", conceptIdsWithOldTag)
      .where({ tag_id: oldTag.id })
      .del();
  });
}

async function updateTagForConcept(concept_id, oldName, newName) {
  return db.transaction(async (trx) => {
    // remove the old one
    await removeTagsFromConcept(concept_id, [oldName], trx);

    // add the tag if not there
    const hasNewTag = await conceptHasTag(concept_id, newName);
    if (!hasNewTag) {
      await addTagsToConcept(concept_id, [newName], trx);
    }
  });
}

/* HELPER FUNCTIONS */
async function conceptHasTag(concept_id, tag, connection=db) {
  const res = await connection.first(
    connection.raw(
      "exists ? as exists",
      connection("concept_tag")
        .join("tag", "tag.id", "concept_tag.tag_id")
        .where({ "concept_tag.concept_id": concept_id, "tag.name": tag })
    )
  );

  return res.exists;
}

async function addTagsToConcept(concept_id, tagNames, connection=db) {
  // Create tag OBJs with `name` property for insertion
  // ["a", "b"] -> [ {name: "a"}, {name: "b"} ]
  const tagObjs = tagNames.map((tagName) => ({ name: tagName }));
  await connection("tag").insert(tagObjs).onConflict("name").ignore();

  // Get tags for tagNames from DB
  const tagsFromDb = await connection("tag").whereIn("name", tagNames);

  // Link each tag to the new concept
  const conceptTagLinks = tagsFromDb.map((t) => ({
    concept_id,
    tag_id: t.id,
  }));

  await connection("concept_tag").insert(conceptTagLinks);
}

async function removeTagsFromConcept(concept_id, tagNames, connection=db) {
  // get IDs of tag names to delete
  const tagIdsToDeleteFlat = await connection("tag")
    .select("name", "id")
    .whereIn("name", tagNames);

  const tagIdsToDelete = tagIdsToDeleteFlat.map((t) => t.id);

  // remove these tags from concept_tag
  await connection("concept_tag")
    .where({ "concept_tag.concept_id": concept_id })
    .whereIn("concept_tag.tag_id", tagIdsToDelete)
    .del();
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

async function updateTagsForConcept(connection, concept_id, updatedTags) {
  // get tags for concept as an array of strings
  const currTags = await getTagsForConcept(concept_id);
  const { tagsToCreate, tagsToDelete } = getTagsDiff(currTags, updatedTags);

  if (tagsToCreate.length > 0)
    await addTagsToConcept(concept_id, tagsToCreate);
  if (tagsToDelete.length > 0)
    await removeTagsFromConcept(concept_id, tagsToDelete, connection);
}

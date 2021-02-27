/*
 * These functions were designed with only concepts & materials in mind
 * Join table must be named: <entity>_tag, e.g. concept_tag
*/
const db = require("../db/db");
const { getTagsDiff, mergeEntityWithTags } = require("../handlers/tag/tag.common");

module.exports = {
  entityHasTag,
  createTagForEntity,
  deleteEntityTag,
  deleteTagFromEntity,
  getEntityTags,
  getTagsForEntity,
  updateEntityTag,
  updateTagForEntity,

  // Helpers
  addTagsToEntity,
  entityTagExists,
  deleteUnreferencedConceptTags,
  removeTagsFromEntity,
  updateTagsForEntity,
};

async function entityTagExists(tableName, user_id, tagName, connection=db) {
  const tagArr = await connection("tag").where({ name: tagName });
  const tag = tagArr[0];

  const tagTableName = `${tableName}_tag`;
  const tagTableIdColumn = `${tableName}_id"`

  const res = await db.first(
    db.raw(
      "exists ? as exists",
      db(tagTableName)
        // concept_tag with tagName exists
        .where({ tag_id: tag.id })
        // and it's attached to a concept belonging to the user
        .whereIn(tagTableIdColumn, function() {
          this.select("id").from(tableName).where({ user_id });
        })
    )
  );

  return res.exists;
}

async function getEntityTags(tableName, user_id, connection=db) {
  const tagTableName = `${tableName}_tag`;
  const userIdColumn = `${tableName}.user_id`;

  return connection(tagTableName)
    .select("tag.name AS tag")
    .join("tag", "tag.id", `${tagTableName}.tag_id`)
    .join(tableName, `${tableName}.id`, `${tagTableName}.${tableName}_id`)
    .where({ [userIdColumn]: user_id });
}

async function getTagsForEntity(tableName, entityId, connection=db) {
  const tagTableName = `${tableName}_tag`;
  const tagTableIdColumn = `${tagTableName}.${tableName}_id`;

  return connection(tagTableName)
    .select("tag.name AS tag")
    .join("tag", `${tableName}_tag.tag_id`, "tag.id")
    .where({ [tagTableIdColumn]: entityId });
}

async function createTagForEntity(tableName, entityId, tag, connection=db) {
  await addTagsToEntity(tableName, entityId, [tag], connection);
}

async function deleteEntityTag(tableName, tagName, user_id, connection=db) {
  await connection.transaction(async (trx) => {
    // get tag name and ID
    const tagArr = await trx("tag").select("id").where({ name: tagName });
    const tagIdToDelete = tagArr[0].id;

    const tagTableName = `${tableName}_tag`;
    const tagTableTagIdColumn = `${tagTableName}.tag_id`;
    const userIdColumn = `${tableName}.user_id`;

    await trx(tagTableName)
      .where({ [tagTableTagIdColumn]: tagIdToDelete })
      .whereIn(`${tagTableName}.${tableName}_id`, function () {
        this.select(`${tableName}.id`)
          .from(tableName)
          .where({ [userIdColumn]: user_id });
      })
      .del();
  });
}

async function deleteTagFromEntity(tableName, entityId, tag, connection=db) {
  console.log("CALLED")
  return removeTagsFromEntity(tableName, entityId, [tag], connection);
}

async function updateEntityTag(tableName, user_id, oldName, newName, connection=db) {
  await connection.transaction(async (trx) => {
    // create new tag in case it doesn't exist
    await trx("tag").insert({ name: newName }).onConflict("name").ignore();

    // get old tag & new tag
    const [oldTag, newTag] = await trx("tag").whereIn("name", [oldName, newName]);

    // get entities with old tag
    const tagTableName = `${tableName}_tag`;
    const tagTableTagIdColumn = `${tagTableName}.tag_id`;
    const tagTableEntityIdColumn = `${tagTableName}.${tableName}_id`;

    const entitiesWithOldTag = await trx(tagTableName)
      .where({ [tagTableTagIdColumn]: oldTag.id })
      .whereIn(tagTableEntityIdColumn, function () {
        this.select(`${tableName}.id`)
          .from(tableName)
          .where({ [`${tableName}.user_id`]: user_id });
      });
    const entityIdsWithOldTag = entitiesWithOldTag.map(ct => ct[`${tableName}_id`]);

    // get entities with the new tag
    // don't include these when inserting new <entity>_tag items
    const entityTagsWithNewTag = await trx(tagTableName)
      .where({ [tagTableTagIdColumn]: newTag.id })
      .whereIn([tagTableEntityIdColumn], entityIdsWithOldTag);

    const entityIdsWithNewTag = entityTagsWithNewTag.map(ct => ct[`${tableName}_id`]);

    const entityIdsWithoutNewTag = entityIdsWithOldTag.filter(
      id => !entityIdsWithNewTag.includes(id)
    );

    // create entity tags with the new tag
    const entityTagsToInsert = entityIdsWithoutNewTag.map(concept_id => {
      return {
        concept_id,
        tag_id: newTag.id,
      }
    });

    // insert new concept tags
    await trx(tagTableName).insert(entityTagsToInsert);

    // delete old concept tags with old tag ID
    await trx(tagTableName)
      .whereIn(`${tableName}_id`, entityIdsWithOldTag)
      .where({ tag_id: oldTag.id })
      .del();
  });
}

async function updateTagForEntity(tableName, entityId, oldName, newName, connection=db) {
  return connection.transaction(async (trx) => {
    // remove the old one
    await removeTagsFromEntity(tableName, entityId, [oldName], trx);

    // add the tag if not there
    const hasNewTag = await entityHasTag(tableName, entityId, newName, trx);
    if (!hasNewTag) {
      await addTagsToEntity(tableName, entityId, [newName], trx);
    }
  });
}

/* HELPER FUNCTIONS */
async function entityHasTag(tableName, entityId, tag, connection=db) {
  const res = await connection.first(
    connection.raw(
      "exists ? as exists",
      connection(`${tableName}_tag`)
        .join("tag", "tag.id", `${tableName}_tag.tag_id`)
        .where({ [`${tableName}_tag.${tableName}_id`]: entityId, "tag.name": tag })
    )
  );

  return res.exists;
}

async function addTagsToEntity(tableName, entity_id, tagNames, connection=db) {
  // Create tag OBJs with `name` property for insertion
  // ["a", "b"] -> [ {name: "a"}, {name: "b"} ]
  const tagObjs = tagNames.map((tagName) => ({ name: tagName }));
  await connection("tag").insert(tagObjs).onConflict("name").ignore();

  // Get tags for tagNames from DB
  const tagsFromDb = await connection("tag").whereIn("name", tagNames);

  const idColumn = `${tableName}_id`;
  // Link each tag to the new concept
  const entityTagLinks = tagsFromDb.map((t) => ({
    [idColumn]: entity_id,
    tag_id: t.id,
  }));

  const tagTableName = `${tableName}_tag`;
  await connection(tagTableName).insert(entityTagLinks);
}

async function removeTagsFromEntity(tableName, entityId, tagNames, connection=db) {
  // get IDs of tag names to delete
  const tagIdsToDeleteFlat = await connection("tag")
    .select("name", "id")
    .whereIn("name", tagNames);

  const tagIdsToDelete = tagIdsToDeleteFlat.map((t) => t.id);

  // remove these tags from concept_tag
  const tagTableName = `${tableName}_tag`;
  const tagTableIdColumn = `${tableName}_tag.${tableName}_id`;

  await connection(tagTableName)
    .where({ [tagTableIdColumn]: entityId })
    .whereIn(`${tagTableName}.tag_id`, tagIdsToDelete)
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

async function updateTagsForEntity(tableName, entityId, updatedTags, connection=db) {
  // get tags for material as an array of strings

  const currTagsFlat = await getTagsForEntity(tableName, entityId, connection);
  const currTags = mergeEntityWithTags(currTagsFlat)[0].tags;
  const { tagsToCreate, tagsToDelete } = getTagsDiff(currTags, updatedTags);

  if (tagsToCreate.length > 0)
    await addTagsToEntity(tableName, entityId, tagsToCreate);
  if (tagsToDelete.length > 0)
    await removeTagsFromEntity(tableName, entityId, tagsToDelete, connection);
}

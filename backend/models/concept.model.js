const db = require("../db/db");
const { deleteConceptConceptLinksForConcept } = require("./concept-concept-link.model");
const { addTagsToEntity, updateTagsForEntity } = require("./entity-tag.model");
const { deleteHooks } = require("./hook.model");
const { deleteConceptSectionLinksForConcept } = require("./concept-section-link.model");

module.exports = {
  createConcept,
  deleteConcept,
  getConcepts,
  updateConcept,
};

async function createConcept(user_id, name, tagNames) {
  return await db.transaction(async (trx) => {
    const [createdConcept] = await trx("concept").insert({ name, user_id }, [
      "id",
      "name",
      "created_at",
      "updated_at",
    ]);

    // if no tags included, return the concept as is
    if (tagNames === undefined || tagNames.length == 0) return createdConcept;

    await addTagsToEntity("concept", createdConcept.id, tagNames, trx);

    return {
      ...createdConcept,
      tags: tagNames,
    };
  });
}

async function deleteConcept(user_id, concept_id) {
  return await db.transaction(async (trx) => {
    // delete all tags for concept
    await trx("concept_tag").where({ concept_id }).del();

    // delete all hooks for concept
    await deleteHooks(concept_id, trx);

    // delete all concept links for concept
    await deleteConceptConceptLinksForConcept(concept_id, trx);

    // delete all concept sections for concept
    await deleteConceptSectionLinksForConcept(concept_id, trx);

    // delete concept itself
    await trx("concept").where({ user_id, id: concept_id }).first().del();
  });
}

async function getConcepts(user_id, options, connection=db) {
  const conceptIdRef = connection.ref("concept.id");
  const numberOfHooksSubquery = connection("hook").count("*").where("concept_id", conceptIdRef).as("num_hooks");

  const columnsToSelect = [
    "concept.id", "concept.name", "concept.created_at", "concept.updated_at",
    numberOfHooksSubquery,
  ];

  if (options.include?.tags) {
    columnsToSelect.push("tag.name AS tag");
  }

  let query = connection("concept")
    .select(...columnsToSelect)
    .where({ ...options.filter, user_id })
    .orderBy("updated_at", "desc");

  if (options.include?.tags) {
    query = query
      .leftJoin("concept_tag", "concept.id", "concept_tag.concept_id")
      .leftJoin("tag", "tag.id", "concept_tag.tag_id");
  }

  return query;
}

async function updateConcept(concept_id, updates, connection=db) {
  const { name, tags: updatedTags } = updates;

  return await connection.transaction(async (trx) => {
    if (name) {
      await trx("concept").where({ id: concept_id }).update({ name });
    }

    if (updatedTags) {
      await updateTagsForEntity("concept", concept_id, updatedTags, trx);
    }
  });
}
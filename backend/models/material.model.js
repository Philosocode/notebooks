const db = require("../db/db");

const { addTagsToEntity } = require("./entity-tag.model");
const { deleteConceptLinksForConcept } = require("./concept-link.model");
const {
  addTagsToConcept,
  updateTagsForConcept,
} = require("./concept-tag.model");
const { deleteHooks } = require("./hook.model");

module.exports = {
  createMaterial,
  deleteConcept,
  getMaterials,
  updateConcept,
};

async function createMaterial(user_id, name, tagNames) {
  return await db.transaction(async (trx) => {
    const [createdMaterial] = await trx("material").insert({ name, user_id }, [
      "id",
      "name",
      "created_at",
      "updated_at",
    ]);

    // if no tags included, return the concept as is
    if (tagNames === undefined || tagNames.length == 0) return createdMaterial;

    await addTagsToEntity("material", createdMaterial.id, tagNames, trx);

    return {
      ...createdMaterial,
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
    await deleteConceptLinksForConcept(concept_id, trx);

    // delete concept itself
    await trx("concept").where({ user_id, id: concept_id }).first().del();
  });
}

async function getMaterials(user_id, options, connection=db) {
  const columnsToSelect = [
    "material.id", "material.name", "material.created_at", "material.updated_at",
  ];

  if (options.include?.tags) {
    columnsToSelect.push("tag.name AS tag");
  }

  let query = connection("material")
    .select(...columnsToSelect)
    .where({ ...options.filter, user_id })
    .orderBy("updated_at", "desc");

  if (options.include?.tags) {
    query = query
      .leftJoin("material_tag", "material.id", "material_tag.material_id")
      .leftJoin("tag", "tag.id", "material_tag.tag_id");
  }

  return query;
}

async function updateConcept(concept_id, updates) {
  const { name, tags: updatedTags } = updates;

  return await db.transaction(async (trx) => {
    if (name) {
      await trx("concept").where({ id: concept_id }).update({ name });
    }

    if (updatedTags) {
      await updateTagsForConcept(trx, concept_id, updatedTags);
    }
  });
}
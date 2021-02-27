const db = require("../db/db");

const { addTagsToEntity } = require("./entity-tag.model");
const {
  addTagsToConcept,
  updateTagsForConcept,
} = require("./concept-tag.model");

module.exports = {
  createMaterial,
  deleteMaterial,
  getMaterials,
  updateConcept,
};

async function createMaterial(user_id, name, tagNames, connection=db) {
  return await connection.transaction(async (trx) => {
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

async function deleteMaterial(user_id, material_id, connection=db) {
  return await connection.transaction(async (trx) => {
    // delete all tags for material
    await trx("material_tag").where({ material_id }).del();

    // delete material itself
    await trx("material").where({ user_id, id: material_id }).first().del();
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

async function updateConcept(concept_id, updates, connection=db) {
  const { name, tags: updatedTags } = updates;

  return await connection.transaction(async (trx) => {
    if (name) {
      await trx("concept").where({ id: concept_id }).update({ name });
    }

    if (updatedTags) {
      await updateTagsForConcept(trx, concept_id, updatedTags);
    }
  });
}
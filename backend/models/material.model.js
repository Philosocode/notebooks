const db = require("../db/db");

const { addTagsToEntity, updateTagsForEntity } = require("./entity-tag.model");
const { deleteSections } = require("./section.model");

module.exports = {
  createMaterial,
  deleteMaterial,
  getMaterials,
  updateMaterial,

  getFlashcardsForMaterial,
  getConceptLinksForMaterial,
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

    // delete all sections for material
    await deleteSections(material_id, trx);

    // delete material itself
    await trx("material").where({ user_id, id: material_id }).first().del();
  });
}

async function getMaterials(user_id, options, connection=db) {
  const columnsToSelect = [
    "material.id", "material.name", "created_at", "updated_at", "user_id"
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

async function updateMaterial(material_id, updates, connection=db) {
  const { name, tags: updatedTags } = updates;

  return await connection.transaction(async (trx) => {
    if (name) {
      await trx("material").where({ id: material_id }).update({ name });
    }

    if (updatedTags) {
      await updateTagsForEntity("material", material_id, updatedTags, trx);
    }
  });
}

async function getFlashcardsForMaterial(material_id, mastered, connection=db) {
  const filter = {
    "section.material_id": material_id,
    ...(mastered !== undefined && { "flashcard.mastered": mastered })
  };

  return connection("flashcard")
    .select(["flashcard.id", "flashcard.question", "flashcard.answer", "flashcard.mastered", "flashcard.section_id", "section.name AS section_name"])
    .join("section", "section.id", "flashcard.section_id")
    .where(filter)
    .orderBy("flashcard.position");
}

async function getConceptLinksForMaterial(material_id, connection=db) {
  return connection("concept_section")
    .select("concept_id")
    .join("section", "section.id", "concept_section.section_id")
    .where({ "section.material_id": material_id })
    .distinct("concept_id");
}
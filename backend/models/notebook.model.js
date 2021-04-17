const db = require("../db/db");

const { addTagsToEntity, updateTagsForEntity } = require("./entity-tag.model");
const { deleteSections } = require("./section.model");

module.exports = {
  createNotebook,
  deleteNotebook,
  getNotebooks,
  updateNotebook,

  getFlashcardsForNotebook,
  getConceptLinksForNotebook,
};

async function createNotebook(user_id, name, tagNames, connection=db) {
  return await connection.transaction(async (trx) => {
    const [createdNotebook] = await trx("notebook").insert({ name, user_id }, [
      "id",
      "name",
      "created_at",
      "updated_at",
    ]);

    // if no tags included, return the concept as is
    if (tagNames === undefined || tagNames.length == 0) return createdNotebook;

    await addTagsToEntity("notebook", createdNotebook.id, tagNames, trx);

    return {
      ...createdNotebook,
      tags: tagNames,
    };
  });
}

async function deleteNotebook(user_id, notebook_id, connection=db) {
  return await connection.transaction(async (trx) => {
    // delete all tags for notebook
    await trx("notebook_tag").where({ notebook_id }).del();

    // delete all sections for notebook
    await deleteSections(notebook_id, trx);

    // delete notebook itself
    await trx("notebook").where({ user_id, id: notebook_id }).first().del();
  });
}

async function getNotebooks(user_id, options, connection=db) {
  const columnsToSelect = [
    "notebook.id", "notebook.name", "created_at", "updated_at", "user_id"
  ];

  if (options.include?.tags) {
    columnsToSelect.push("tag.name AS tag");
  }

  let query = connection("notebook")
    .select(...columnsToSelect)
    .where({ ...options.filter, user_id })
    .orderBy("updated_at", "desc");

  if (options.include?.tags) {
    query = query
      .leftJoin("notebook_tag", "notebook.id", "notebook_tag.notebook_id")
      .leftJoin("tag", "tag.id", "notebook_tag.tag_id");
  }

  return query;
}

async function updateNotebook(notebook_id, updates, connection=db) {
  const { name, tags: updatedTags } = updates;

  return await connection.transaction(async (trx) => {
    if (name) {
      await trx("notebook").where({ id: notebook_id }).update({ name });
    }

    if (updatedTags) {
      await updateTagsForEntity("notebook", notebook_id, updatedTags, trx);
    }
  });
}

async function getFlashcardsForNotebook(notebook_id, mastered, connection=db) {
  const filter = {
    "section.notebook_id": notebook_id,
    ...(mastered !== undefined && { "flashcard.mastered": mastered })
  };

  return connection("flashcard")
    .select(["flashcard.id", "flashcard.question", "flashcard.answer", "flashcard.mastered", "flashcard.section_id", "section.name AS section_name"])
    .join("section", "section.id", "flashcard.section_id")
    .where(filter)
    .orderBy("flashcard.position");
}

async function getConceptLinksForNotebook(notebook_id, connection=db) {
  return connection("concept_section")
    .select("concept_id")
    .join("section", "section.id", "concept_section.section_id")
    .where({ "section.notebook_id": notebook_id })
    .distinct("concept_id");
}
const db = require("../db/db");
const { shiftPositions, getMaxPosition } = require("./common.model");
const { defaultSectionChecklist } = require("../handlers/section/section.common");
const { deleteNotes, deleteNotesForNotebook } = require("./note.model");
const { deleteConceptSectionLinksForSection, deleteConceptSectionLinksForNotebook } = require("./concept-section-link.model");
const { deleteFlashcards, deleteFlashcardsForNotebook } = require("./flashcard.model");

module.exports = {
  createSection,
  getSection,
  getSections,
  updateSection,
  deleteSection,
  deleteSections,
  userOwnsSection,
  getFlashcardsForSection,
};

// Referenced: https://medium.com/the-missing-bit/keeping-an-ordered-collection-in-postgresql-9da0348c4bbe
async function createSection(
  notebook_id,
  name,
  connection=db
) {
  const createdSectionArray = await connection.transaction(async (trx) => {
    // shift positions of elements after
    let insertPosition = await getMaxPosition("section", { notebook_id });
    if (insertPosition === -1) insertPosition = 1;
    else insertPosition++;

    // create section
    return trx("section").insert(
      {
        name, notebook_id,
        position: insertPosition,
        checklist: JSON.stringify(defaultSectionChecklist),
      }, ["*"]
    );
  });

  return createdSectionArray[0];
}

async function getSections(notebook_id, filterObject, connection=db) {
  return connection("section")
    .select("*")
    .where({ notebook_id, ...filterObject })
    .orderBy("position");
}

async function getSection(section_id, connection=db) {
  return connection("section")
    .select("*")
    .where({ id: section_id })
    .first();
}

async function updateSection(notebook_id, section_id, updates, connection=db) {
  // updates: title, content, position
  return connection.transaction(async trx => {
    const newPosition = updates.position;
    const { checklist, ...updatesWithoutChecklist } = updates;

    if (newPosition !== undefined) {
      const oldPositionResult = await trx("section").select("position").where({ id: section_id });
      const oldPosition = oldPositionResult[0].position;

      if (oldPosition !== newPosition) {
        // decrement positions after old position
        await shiftPositions("section", { notebook_id }, oldPosition, false, trx);

        // increment positions after the new position
        await shiftPositions("section", { notebook_id }, newPosition, true, trx);
      }
    }

    if (checklist) {
      // patch checklist properties rather than completely replacing it
      await trx.raw(
        `UPDATE section SET checklist = checklist || ? WHERE id = ?`,
        [JSON.stringify(checklist), section_id]
      );
    }

    // checklist updated handled above; only update if name or position was provided
    if (updates.name || newPosition) {
      return trx("section").where({ id: section_id }).update(updatesWithoutChecklist);
    }
  });
}

async function deleteSection(section_id, connection=db) {
  return connection.transaction(async (trx) => {
    const sectionToDelete = await trx("section")
      .select("position")
      .where({ id: section_id });

    const sectionPosition = sectionToDelete[0].position;

    // delete concept sections for section
    await deleteConceptSectionLinksForSection(section_id, trx);

    // delete notes for section
    await deleteNotes(section_id, trx);

    // delete flashcards for section
    await deleteFlashcards(section_id);

    await trx("section").where({ id: section_id }).del();

    await shiftPositions("section", {}, sectionPosition, false, trx);
  });
}

async function deleteSections(notebook_id, connection=db) {
  return connection.transaction(async (trx) => {
    // delete notes for notebook ID
    await deleteNotesForNotebook(notebook_id, trx);

    // delete concept sections for notebook ID
    await deleteConceptSectionLinksForNotebook(notebook_id, trx);

    // delete flashcards for notebook ID
    await deleteFlashcardsForNotebook(notebook_id, trx);

    // delete all sections for notebook ID
    await trx("section").where({ notebook_id }).del();
  })
}

async function getFlashcardsForSection(section_id, mastered, connection=db) {
  const filter = {
    "flashcard.section_id": section_id,
    ...(mastered !== undefined && { "flashcard.mastered": mastered })
  };

  return connection("flashcard")
    .select(["flashcard.id", "flashcard.question", "flashcard.answer", "flashcard.mastered", "flashcard.section_id", "section.name AS section_name"])
    .where(filter)
    .join("section", "section.id", "flashcard.section_id")
    .orderBy("flashcard.position");
}

/* HELPERS */
async function userOwnsSection(section_id, user_id, connection=db) {
  const userIdResult = await connection("section")
    .where({ "section.id": section_id })
    .join("notebook", "notebook.id", "section.notebook_id")
    .first();

  return userIdResult?.user_id === user_id;
}
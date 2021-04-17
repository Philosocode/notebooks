const db = require("../db/db");
const { shiftPositions, getValidInsertPosition, getMaxPosition } = require("./common.model");

module.exports = {
  createNote,
  getNote,
  getNotes,
  deleteNote,
  deleteNotes,
  updateNote,

  // Helpers
  deleteNotesForMaterial,
}

// Referenced: https://medium.com/the-missing-bit/keeping-an-ordered-collection-in-postgresql-9da0348c4bbe
async function createNote(
  part_id,
  name,
  content,
  connection=db
) {
  const result = await connection.transaction(async (trx) => {
    let position = await getMaxPosition("note", { part_id }, trx);

    if (position === -1) {
      position = 1;
    } else {
      // append to end
      position++;
    }

    return trx("note").insert({
      name,
      content,
      position,
      part_id,
    }, ["*"]);
  });

  return result[0];
}

async function getNotes(part_id, filterObject, connection=db) {
  return connection("note")
    .select("*")
    .where({ ...filterObject, part_id })
    .orderBy("position");
}

async function getNote(note_id, connection=db) {
  return connection("note")
    .select("*")
    .where({ id: note_id })
    .first();
}

async function updateNote(part_id, note_id, updates, connection = db) {
  // updates: title, content, position
  return connection.transaction(async trx => {
    const newPosition = updates.position;

    if (newPosition !== undefined) {
      const oldPositionResult = await trx("note")
        .select("position")
        .where({ id: note_id });
      const oldPosition = oldPositionResult[0].position;

      if (oldPosition !== newPosition) {
        // decrement positions after old position
        await shiftPositions("note", { part_id }, oldPosition, false, trx);

        // increment positions after the new position
        await shiftPositions("note", { part_id }, newPosition, true, trx);
      }
    }

    return trx("note").where({ id: note_id }).update(updates);
  });
}

async function deleteNote(part_id, note_id, connection=db) {
  return connection.transaction(async (trx) => {
    const noteToDelete = await trx("note")
      .select("position")
      .where({ part_id, id: note_id });

    if (!noteToDelete) return;

    const notePosition = noteToDelete[0].position;

    await trx("note").where({ id: note_id }).del();

    // decrement positions of notes after
    await shiftPositions("note", {}, notePosition, false, trx);
  });
}

async function deleteNotes(part_id, connection=db) {
  return connection("note").where({ part_id }).del();
}

/* HELPERS */
async function deleteNotesForMaterial(material_id, connection=db) {
  // delete where note.part_id is in...
  return connection("note").whereIn("part_id", function() {
    // select parts with the material ID
    this.select("id")
      .from("part")
      .where({ "part.material_id": material_id });
  }).del();
}
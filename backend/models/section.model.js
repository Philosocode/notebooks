const db = require("../db/db");
const { shiftPositions, getValidInsertPosition, getMaxPosition } = require("./common.model");

module.exports = {
  createSection,
  getSection,
  getSections,
  deleteSection,
  deleteSections,
  updateSection,

  // Helpers
  deleteSectionsForMaterial,
}

// Referenced: https://medium.com/the-missing-bit/keeping-an-ordered-collection-in-postgresql-9da0348c4bbe
async function createSection(
  part_id,
  name,
  content,
  connection=db
) {
  return connection.transaction(async (trx) => {
    let position = await getMaxPosition("section", { part_id }, trx);

    if (position === -1) {
      position = 1;
    } else {
      // append to end
      position++;
    }

    return trx("section").insert({
      name,
      content,
      position,
      part_id,
    }, ["*"]);
  });
}

async function getSections(part_id, filterObject, connection=db) {
  return connection("section")
    .select("*")
    .where({ ...filterObject, part_id })
    .orderBy("position");
}

async function getSection(section_id, connection=db) {
  return connection("section")
    .select("*")
    .where({ id: section_id })
    .first();
}

async function updateSection(part_id, section_id, updates, connection = db) {
  // updates: title, content, position
  return connection.transaction(async trx => {
    const newPosition = updates.position;

    if (newPosition !== undefined) {
      const oldPositionResult = await trx("section")
        .select("position")
        .where({ id: section_id });
      const oldPosition = oldPositionResult[0].position;

      if (oldPosition !== newPosition) {
        // decrement positions after old position
        await shiftPositions("section", { part_id }, oldPosition, false, trx);

        // increment positions after the new position
        await shiftPositions("section", { part_id }, newPosition, true, trx);
      }
    }

    return trx("section").where({ id: section_id }).update(updates);
  });
}

async function deleteSection(part_id, section_id, connection=db) {
  return connection.transaction(async (trx) => {
    const sectionToDelete = await trx("section")
      .select("position")
      .where({ part_id, id: section_id });

    if (!sectionToDelete) return;

    const sectionPosition = sectionToDelete[0].position;

    await trx("section").where({ id: section_id }).del();

    // decrement positions of sections after
    await shiftPositions("section", {}, sectionPosition, false, trx);
  });
}

async function deleteSections(part_id, connection=db) {
  return connection("section").where({ part_id }).del();
}

/* HELPERS */
async function deleteSectionsForMaterial(material_id, connection=db) {
  // delete where section.part_id is in...
  return connection("section").whereIn("part_id", function() {
    // select parts with the material ID
    this.select("id")
      .from("part")
      .where({ "part.material_id": material_id });
  }).del();
}
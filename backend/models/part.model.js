const db = require("../db/db");
const { shiftPositions, getMaxPosition } = require("./common.model");
const { defaultPartChecklist } = require("../handlers/part/part.common");
const { deleteSections, deleteSectionsForMaterial } = require("./section.model");

module.exports = {
  createPart,
  getPart,
  getParts,
  updatePart,
  deletePart,
  deleteParts,
  userOwnsPart,
};

// Referenced: https://medium.com/the-missing-bit/keeping-an-ordered-collection-in-postgresql-9da0348c4bbe
async function createPart(
  material_id,
  name,
  connection=db
) {
  const createdPartArray = await connection.transaction(async (trx) => {
    // shift positions of elements after
    let insertPosition = await getMaxPosition("part", { material_id });
    if (insertPosition === -1) insertPosition = 1;
    else insertPosition++;

    // create part
    return trx("part").insert(
      {
        name, material_id,
        position: insertPosition,
        checklist: JSON.stringify(defaultPartChecklist),
      }, ["*"]
    );
  });

  return createdPartArray[0];
}

async function getParts(material_id, filterObject, connection=db) {
  return connection("part")
    .select("*")
    .where({ material_id, ...filterObject })
    .orderBy("position");
}

async function getPart(part_id, connection=db) {
  return connection("part")
    .select("*")
    .where({ id: part_id })
    .first();
}

async function updatePart(material_id, part_id, updates, connection=db) {
  // updates: title, content, position
  return connection.transaction(async trx => {
    const newPosition = updates.position;
    const { checklist, ...updatesWithoutChecklist } = updates;


    if (newPosition !== undefined) {
      const oldPositionResult = await trx("part").select("position").where({ id: part_id });
      const oldPosition = oldPositionResult[0].position;

      if (oldPosition !== newPosition) {
        // decrement positions after old position
        await shiftPositions("part", { material_id }, oldPosition, false, trx);

        // increment positions after the new position
        await shiftPositions("part", { material_id }, newPosition, true, trx);
      }
    }

    if (checklist) {
      // patch checklist properties rather than completely replacing it
      await trx.raw(
        `UPDATE part SET checklist = checklist || ? WHERE id = ?`,
        [JSON.stringify(checklist), part_id]
      );
    }

    // checklist updated handled above; only update if name or position was provided
    if (updates.name || newPosition) {
      return trx("part").where({ id: part_id }).update(updatesWithoutChecklist);
    }
  });
}

async function deletePart(part_id, connection=db) {
  return connection.transaction(async (trx) => {
    const partToDelete = await trx("part")
      .select("position")
      .where({ id: part_id });

    const partPosition = partToDelete[0].position;

    // delete sections for part
    await deleteSections(part_id, trx);

    await trx("part").where({ id: part_id }).del();

    await shiftPositions("part", {}, partPosition, false, trx);
  });
}

async function deleteParts(material_id, connection=db) {
  return connection.transaction(async (trx) => {
    // delete sections for material ID
    await deleteSectionsForMaterial(material_id, trx);

    // delete all parts for material ID
    await trx("part").where({ material_id }).del();
  })
}

/* HELPERS */
async function userOwnsPart(part_id, user_id, connection=db) {
  const userIdResult = await connection("part")
    .where({ "part.id": part_id })
    .join("material", "material.id", "part.material_id")
    .first();

  return userIdResult?.user_id === user_id;
}
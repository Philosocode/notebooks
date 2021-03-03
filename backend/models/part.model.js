const db = require("../db/db");
const { shiftPositions, getMaxPosition } = require("./common.model");

module.exports = {
  createPart,
  getParts,
  updatePart,
};

// Referenced: https://medium.com/the-missing-bit/keeping-an-ordered-collection-in-postgresql-9da0348c4bbe
async function createPart(
  material_id,
  name,
  connection=db
) {
  const createdPartArray = await connection.transaction(async (trx) => {
    // shift positions of elements after
    const insertPosition = await getMaxPosition("part", { material_id }) + 1;

    // create part
    return trx("part").insert(
      { name, material_id, position: insertPosition }, ["*"]
    );
  });

  return createdPartArray[0];
}

async function getParts(material_id, filterObject, connection=db) {
  return connection("part")
    .select("id", "name", "position", "created_at", "updated_at")
    .where({ material_id, ...filterObject })
    .orderBy("position");
}

async function updatePart(material_id, part_id, updates, connection=db) {
  // updates: title, content, position
  return connection.transaction(async trx => {
    const newPosition = updates.position;

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

    return trx("part").where({ id: part_id }).update(updates);
  });
}
const db = require("../db/db");
const { shiftPositions } = require("./common.model");

module.exports = {
  createHook,
  deleteHook,
  deleteHooks,
  getHooks,
  updateHook,
};

// Referenced: https://medium.com/the-missing-bit/keeping-an-ordered-collection-in-postgresql-9da0348c4bbe
async function createHook(
  concept_id,
  title,
  content,
  position,
  connection = db
) {
  return connection.transaction(async (trx) => {
    // shift positions of elements after
    await shiftPositions("hook", { concept_id }, position, true, trx);

    // create hook
    return await trx("hook").insert(
      { title, content, concept_id, position }, ["*"]
    );
  });
}

async function deleteHook(concept_id, hook_id, connection = db) {
  return connection.transaction(async (trx) => {
    const hookToDelete = await trx("hook")
      .select("position")
      .where({ concept_id, id: hook_id });

    const hookPosition = hookToDelete[0].position;

    await trx("hook").where({ id: hook_id }).del();

    await shiftPositions("hook", {}, hookPosition, false, trx);
  });
}

async function deleteHooks(concept_id, connection = db) {
  return connection("hook").where({ concept_id }).del();
}

async function getHooks(concept_id, filterObj, connection = db) {
  return connection("hook")
    .where({ concept_id, ...filterObj })
    .orderBy("position");
}

async function updateHook(concept_id, hook_id, updates, connection = db) {
  // updates: title, content, position
  return connection.transaction(async trx => {
    const newPosition = updates.position;

    if (newPosition !== undefined) {
      const oldPositionResult = await trx("hook")
        .select("position")
        .where({ id: hook_id });
      const oldPosition = oldPositionResult[0].position;

      if (oldPosition !== newPosition) {
        // decrement positions after old position
        await shiftPositions("hook", { concept_id }, oldPosition, false, trx);

        // increment positions after the new position
        await shiftPositions("hook", { concept_id }, newPosition, true, trx);
      }
    }

    return trx("hook").where({ id: hook_id }).update(updates);
  });
}
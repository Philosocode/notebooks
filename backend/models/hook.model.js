const db = require("../db/db");
const { shiftPositions } = require("./common.model");

module.exports = {
  createHook,
  deleteHook,
  deleteHooks,
  getHooks,
};

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
    const createdHook = await trx("hook").insert(
      {
        title,
        content,
        concept_id,
        position,
      },
      ["*"]
    );

    return createdHook;
  });
}

async function deleteHook(concept_id, hook_id, connection = db) {
  return connection.transaction(async (trx) => {
    const hookToDelete = await trx("hook")
      .select("position")
      .where({ concept_id, id: hook_id });

    const hookPosition = hookToDelete[0].position;

    await trx("hook").where({ concept_id, id: hook_id }).del();

    await shiftPositions("hook", { concept_id }, hookPosition, false, trx);
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

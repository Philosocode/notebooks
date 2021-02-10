const db = require("../db/db");
const { shiftPositionsUp } = require("./common.model");

module.exports = {
  createHook,
  getHooks,
};

async function createHook(concept_id, title, content, position, connection=db) {
  return connection.transaction(async trx => {
    // shift positions of elements after
    await shiftPositionsUp("hook", { concept_id }, position, trx);

    // create hook
    const createdHook = await trx("hook").insert({
      title,
      content,
      concept_id,
      position,
    }, ["*"]);

    return createdHook;
  });
}

async function getHooks(concept_id, filterObj, connection=db) {
  return connection("hook").where({ concept_id, ...filterObj });
}
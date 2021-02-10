const db = require("../db/db");
const { shiftPositionsUp } = require("./common.model");

module.exports = {
  createHook,
};

async function createHook(concept_id, title, content, position) {
  return db.transaction(async trx => {
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
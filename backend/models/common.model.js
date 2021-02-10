const db = require("../db/db");

module.exports = {
  entityExists,
  shiftPositionsUp,
};

async function entityExists(tableName, filter, connection=db) {
  const res = await connection.first(
    connection.raw(
      "exists ? as exists",
      connection(tableName).select("id").where(filter)
    )
  );

  return res.exists;
}

async function shiftPositionsUp(tableName, filterObj, startIdx, connection=db) {
  // shift positions of elements after
  await connection(tableName)
    .increment("position")
    .where({ ...filterObj })
    .andWhere("position", ">=", startIdx)
}
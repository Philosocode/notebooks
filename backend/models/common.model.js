const db = require("../db/db");

module.exports = {
  entityExists,
  shiftPositions,
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

async function shiftPositions(tableName, filterObj, startIdx, shiftUp=true, connection=db) {
  let query = connection(tableName).where({ ...filterObj });

  // when inserting, need to increment items to the right
  // when deleting, need to decrement items to the right
  query = shiftUp
    ? query.increment("position")
    : query.decrement("position");

    // shift positions of elements after
  query.andWhere("position", ">=", startIdx)

  return query;

}
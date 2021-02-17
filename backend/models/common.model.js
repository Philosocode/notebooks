const db = require("../db/db");

module.exports = {
  entityExists,
  getMaxPosition,
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

async function getMaxPosition(tableName, filterObj, connection=db) {
  const maxResultArray = await connection(tableName)
    .max("position")
    .where(filterObj);

  const maxPosition = maxResultArray[0].max;

  // if max is undefined or null, no hooks present
  if (!maxPosition) return 1;

  return maxPosition;
}

async function shiftPositions(tableName, filterObj, startIdx, shiftUp=true, connection=db) {
  let query = connection(tableName).where(filterObj);

  // shift positions of elements after
  query = query.andWhere("position", ">=", startIdx)

  // when inserting, need to increment items to the right
  // when deleting, need to decrement items to the right
  query = shiftUp
    ? query.increment("position")
    : query.decrement("position");

  return query;

}
const db = require("../db/db");

module.exports = {
  entityExists,
  getMaxPosition,
  getValidInsertPosition,
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

async function getValidInsertPosition(
  tableName,
  filterObj,
  position,
  canAppendToEnd,
  connection=db
) {
  if (position < 1) return 1;

  // ensure user can't insert beyond the max position
  const maxPosition = await getMaxPosition(tableName, filterObj, connection);
  if (maxPosition === -1) return 1;
  
  // +1 so insert after last item is possible
  if (canAppendToEnd && position > maxPosition) return maxPosition + 1;
  else if (position > maxPosition) return maxPosition;

  return position;
};


async function getMaxPosition(tableName, filterObj, connection=db) {
  const maxResultArray = await connection(tableName)
    .max("position")
    .where(filterObj);

  const maxPosition = maxResultArray[0].max;

  // if max is undefined or null, no entities
  if (!maxPosition) return -1;

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
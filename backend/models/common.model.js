const db = require("../db/db");

module.exports = {
  entityExists,
};

async function entityExists(tableName, filter, connection=db) {
  const res = await db.first(
    db.raw(
      "exists ? as exists",
      db(tableName).select("id").where(filter)
    )
  );

  return res.exists;
}
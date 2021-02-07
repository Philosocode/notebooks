const db = require("../db/db");

module.exports = {
  entityExists,
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
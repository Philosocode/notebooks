const db = require("../db/db");
const { shiftPositions } = require("./common.model");

module.exports = {
  createPart,
  getParts,
};

// Referenced: https://medium.com/the-missing-bit/keeping-an-ordered-collection-in-postgresql-9da0348c4bbe
async function createPart(
  material_id,
  name,
  position,
  connection = db
) {
  const createdPartArray = await connection.transaction(async (trx) => {
    // shift positions of elements after
    await shiftPositions("part", { material_id }, position, true, trx);

    // create part
    return trx("part").insert(
      { name, material_id, position }, ["*"]
    );
  });

  return createdPartArray[0];
}

async function getParts(material_id, filterObject, connection=db) {
  return connection("part")
    .select("id", "name", "created_at", "updated_at")
    .where({ material_id, ...filterObject })
    .orderBy("position", "desc");
}
const db = require("../db/db");
const { shiftPositions, getMaxPosition } = require("./common.model");

module.exports = {
  createFact,
  deleteFact,
  deleteFacts,
  getFacts,
  getFactsForUser,
  updateFact,
};

// Referenced: https://medium.com/the-missing-bit/keeping-an-ordered-collection-in-postgresql-9da0348c4bbe
async function createFact(
  part_id,
  question,
  answer,
  connection=db
) {
  const createdFactResult = await connection.transaction(async (trx) => {
    // shift positions of elements after
    let insertPosition = await getMaxPosition("fact", { part_id });
    if (insertPosition === -1) insertPosition = 1;
    else insertPosition++;

    return trx("fact").insert(
      {
        question, answer, part_id,
        mastered: false,
        position: insertPosition 
      }, ["*"]
    );
  });

  return createdFactResult[0];
}

async function deleteFact(fact_id, connection=db) {
  return connection.transaction(async (trx) => {
    const factToDelete = await trx("fact")
      .select("position")
      .where({ id: fact_id });

    const factPosition = factToDelete[0].position;

    await trx("fact").where({ id: fact_id }).del();

    await shiftPositions("fact", {}, factPosition, false, trx);
  });
}

async function deleteFacts(part_id, connection=db) {
  return connection("fact").where({ part_id }).del();
}

async function getFacts(part_id, filterObj, connection=db) {
  return connection("fact")
    .where({ part_id, ...filterObj })
    .orderBy("position");
}

async function getFactsForUser(user_id, mastered, connection=db) {
  const filter = {
    "material.user_id": user_id,
    ...(mastered !== undefined && { "fact.mastered": mastered })
  };

  console.log(filter)

  return connection("fact")
    .select(["fact.id", "fact.question", "fact.answer", "fact.mastered", "fact.part_id"])
    .join("part", "part.id", "fact.part_id")
    .join("material", "material.id", "part.material_id")
    .where(filter)
    .orderBy("fact.position");
}

async function updateFact(part_id, fact_id, updates, connection=db) {
  // updates: title, content, position
  return connection.transaction(async trx => {
    const newPosition = updates.position;

    if (newPosition !== undefined) {
      const oldPositionResult = await trx("fact")
        .select("position")
        .where({ id: fact_id });
      const oldPosition = oldPositionResult[0].position;

      if (oldPosition !== newPosition) {
        // decrement positions after old position
        await shiftPositions("fact", { part_id }, oldPosition, false, trx);

        // increment positions after the new position
        await shiftPositions("fact", { part_id }, newPosition, true, trx);
      }
    }

    return trx("fact").where({ id: fact_id }).update(updates);
  });
}
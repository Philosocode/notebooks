const db = require("../db/db");
const { shiftPositions, getMaxPosition } = require("./common.model");

module.exports = {
  createFlashcard,
  deleteFlashcard,
  deleteFlashcards,
  getFlashcards,
  getFlashcardsForUser,
  updateFlashcard,
  deleteFlashcardsForMaterial,
};

// Referenced: https://medium.com/the-missing-bit/keeping-an-ordered-collection-in-postgresql-9da0348c4bbe
async function createFlashcard(
  section_id,
  question,
  answer,
  connection=db
) {
  const createdFlashcardResult = await connection.transaction(async (trx) => {
    // shift positions of elements after
    let insertPosition = await getMaxPosition("flashcard", { section_id });
    if (insertPosition === -1) insertPosition = 1;
    else insertPosition++;

    return trx("flashcard").insert(
      {
        question, answer, section_id,
        mastered: false,
        position: insertPosition 
      }, ["*"]
    );
  });

  return createdFlashcardResult[0];
}

async function deleteFlashcard(flashcard_id, connection=db) {
  return connection.transaction(async (trx) => {
    const flashcardToDelete = await trx("flashcard")
      .select("position")
      .where({ id: flashcard_id });

    const flashcardPosition = flashcardToDelete[0].position;

    await trx("flashcard").where({ id: flashcard_id }).del();

    await shiftPositions("flashcard", {}, flashcardPosition, false, trx);
  });
}

async function deleteFlashcards(section_id, connection=db) {
  return connection("flashcard").where({ section_id }).del();
}

async function deleteFlashcardsForMaterial(material_id, connection=db) {
  return connection("flashcard").whereIn("section_id", function() {
    this.select("id")
      .from("section")
      .where({ "section.material_id": material_id });
  }).del();
}

async function getFlashcards(section_id, filterObj, connection=db) {
  return connection("flashcard")
    .where({ section_id, ...filterObj })
    .orderBy("position");
}

async function getFlashcardsForUser(user_id, mastered, connection=db) {
  const filter = {
    "material.user_id": user_id,
    ...(mastered !== undefined && { "flashcard.mastered": mastered })
  };

  return connection("flashcard")
    .select(["flashcard.id", "flashcard.question", "flashcard.answer", "flashcard.mastered", "flashcard.section_id", "section.name AS section_name"])
    .join("section", "section.id", "flashcard.section_id")
    .join("material", "material.id", "section.material_id")
    .where(filter)
    .orderBy("flashcard.position");
}

async function updateFlashcard(section_id, flashcard_id, updates, connection=db) {
  // updates: name, content, position
  return connection.transaction(async trx => {
    const newPosition = updates.position;

    if (newPosition !== undefined) {
      const oldPositionResult = await trx("flashcard")
        .select("position")
        .where({ id: flashcard_id });
      const oldPosition = oldPositionResult[0].position;

      if (oldPosition !== newPosition) {
        // decrement positions after old position
        await shiftPositions("flashcard", { section_id }, oldPosition, false, trx);

        // increment positions after the new position
        await shiftPositions("flashcard", { section_id }, newPosition, true, trx);
      }
    }

    return trx("flashcard").where({ id: flashcard_id }).update(updates);
  });
}
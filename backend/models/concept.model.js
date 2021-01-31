const db = require("../db/db");

module.exports = {
  createConcept,
  deleteConcept,
  getConcept,
  getConcepts,
  updateConcept,
};

async function createConcept(user_id, name, tagNames) {
  return await db.transaction(async trx => {
    const [createdConcept] = await trx("concept").insert(
      { name, user_id },
      ["id", "name", "created_at"]
    );
    
    if (tagNames === undefined || tagNames.length == 0) return createdConcept;

    // Create tags for concept
    // ["a", "b"] -> [ {name: "a"}, {name: "b"} ]
    const tagObjs = tagNames.map(tagName => ( { name: tagName } ));
    await trx("tag").insert(tagObjs).onConflict("name").ignore();

    // Get tags for tagNames from DB
    const tagsFromDb = await trx("tag").whereIn("name", tagNames);

    // Link each tag to the new concept
    const conceptTagLinks = tagsFromDb.map(t => ({
      concept_id: createdConcept.id,
      tag_id: t.id
    }));

    await trx("concept_tag").insert(conceptTagLinks);

    return {
      ...createdConcept,
      tags: tagNames
    };
  });
}

async function deleteConcept(filterObj) {
  return db("concept").where(filterObj).del();
}

async function getConcept(filterObj) {
  return db("concept").where(filterObj).first();
}

async function getConcepts(filterObj) {
  return db("concept").where(filterObj);
}

async function updateConcept(filterObj, updates) {
  return db("concept").where(filterObj).update(updates);
}

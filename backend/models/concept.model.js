const db = require("../db/db");

module.exports = {
  createConcept,
  deleteConcept,
  getConcept,
  getConcepts,
  updateConcept,
};

async function createConcept(user_id, name) {
  return db("concept").insert({ name, user_id }, ["id", "name", "created_at"]);
}

async function deleteConcept(user_id, id) {
  return db("concept").where({ id, user_id }).del();
}

async function getConcept(user_id, id) {
  return db("concept").where({ id, user_id }).first();
}

async function getConcepts(user_id) {
  return db("concept").where({ user_id });
}

async function updateConcept(user_id, id, updates) {
  return db("concept").where({ user_id, id }).update(updates);
}

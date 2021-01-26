const db = require("../db/db");

module.exports = {
  createConcept,
  getConcepts
};

async function createConcept(user_id, name) {
  return db("concept").insert({
    name,
    user_id,
  });
}

async function getConcepts(user_id) {
  return db("concept").where({ user_id });
}
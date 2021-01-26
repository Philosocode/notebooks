const db = require("../db/db");

module.exports = {
  getConceptsForUser
};

async function getConceptsForUser(user_id) {
  return db("concept").where({
    user_id: user_id
  });
}


const db = require("../db/db");

module.exports = {
  getUsers,
};

async function getUsers() {
  return await db("user");
}

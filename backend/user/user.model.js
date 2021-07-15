const db = require("../db/db");

module.exports = {
  createUser,
  getGoogleUser,
  getUser,
  getUsers,
  upsertUser,
  updateUserSettings,
};

async function createUser(name, email, hashedPassword, connection = db) {
  return connection("user")
    .insert({ name, email, password: hashedPassword })
    .returning("id");
}

async function getUser(filterObj, connection = db) {
  return connection("user").where(filterObj).first();
}

async function getUsers() {
  return db("user");
}

async function getGoogleUser(google_id) {
  return db("user").where("google_id", google_id).first();
}

async function upsertUser(email, google_id, name, photo_url, connection = db) {
  return connection("user")
    .insert({
      email,
      google_id,
      name,
      photo_url,
    })
    .onConflict("google_id")
    .merge();
}

async function updateUserSettings(id, settings, connection = db) {
  // patch settings properties rather than completely replacing it
  return connection.raw(
    `UPDATE "user" SET settings = settings || ? WHERE id = ?`,
    [JSON.stringify(settings), id]
  );
}

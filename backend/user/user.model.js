const db = require("../db/db");

module.exports = {
  createUser,
  getGoogleUser,
  getUser,
  getUsers,
  upsertUser,
  updateUserSettings,
};

async function createUser(name, email, hashedPassword, connection=db) {
  return; 
}

async function getUser(user_id) {
  return db("user").where({ id: user_id }).first();
}

async function getUsers() {
  return db("user");
}

async function getGoogleUser(google_id) {
  return db("user").where("google_id", google_id).first();
}

async function upsertUser(email, google_id, name, photo_url, connection=db) {
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

async function updateUserSettings(id, settings, connection=db) {
  // patch settings properties rather than completely replacing it
  return connection.raw(
    `UPDATE "user" SET settings = settings || ? WHERE id = ?`,
    [JSON.stringify(settings), id]
  );
}
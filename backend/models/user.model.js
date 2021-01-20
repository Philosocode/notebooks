const db = require("../db/db");

module.exports = {
  getGoogleUser,
  getUsers,
  upsertUser,
};

async function getUsers() {
  return await db("user");
}

async function getGoogleUser(google_id) {
  return await db("user").where("google_id", google_id).first();
}

async function upsertUser(email, google_id, name, photo_url) {
  return await db("user")
    .insert({
      email,
      google_id,
      name,
      photo_url,
    })
    .onConflict("google_id")
    .merge();
}

const db = require("../db/db");

module.exports = {
  createTag,
  createTags,
  deleteTag,
  getTag,
  getTags,
  updateTag,
};

async function createTag(tag) {
  return db("tag").insert(tag);
}

async function createTags(tags) {
  return db("tag").insert(tags).onConflict("name").ignore();
}

async function deleteTag(id) {
  return db("tag").where({ id }).del();
}

async function getTag(id) {
  return db("tag").where({ id });
}

async function getTags() {
  return db("tag");
}

async function updateTag(id, name) {
  return db("tag").where({ id }).update(name);
}
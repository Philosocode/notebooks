const db = require("../db/db");

module.exports = {
  createTag,
  createTags,
  deleteTag,
  getTag,
  getTags,
  getTagsForConcept,
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

async function getTagsForConcept(concept_id) {
  return db("tag")
    .join("concept_tag", "tag.id", "concept_tag.tag_id")
    .where({ "concept_tag.concept_id": concept_id })
    .select("name");
}

async function updateTag(id, name) {
  return db("tag").where({ id }).update(name);
}
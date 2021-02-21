exports.up = function(knex) {
  return knex.schema.renameTable("concept_concept", "concept_link");
};

exports.down = function(knex) {
  return knex.schema.renameTable("concept_link", "concept_concept");
};
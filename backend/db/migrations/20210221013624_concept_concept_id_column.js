exports.up = function(knex) {
  return knex.schema.table("concept_concept", function(table) {
    table.dropPrimary();

    // add new primary ID column
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table.unique(["concept1_id", "concept2_id"]);
  })
};

exports.down = function(knex) {
  return knex.schema.table("concept_concept", function(table) {
    table.dropColumn("id");
    table.dropUnique(["concept1_id", "concept2_id"]);

    table.primary(["concept1_id", "concept2_id"]);
  })
};

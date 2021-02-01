const { onUpdateTrigger } = require("../../knexfile");

exports.up = function (knex) {
  return knex.schema.createTable("section", (tbl) => {
    tbl.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    tbl.string("name", 100).notNullable();
    tbl.text("content").notNullable();
    tbl.integer("position").notNullable();
    // adds created_at, updated_at
    tbl.timestamps(true, true);
    tbl.uuid("part_id").notNullable().references("id").inTable("part");
  })
    .then(() => knex.raw(onUpdateTrigger("section")));
};

exports.down = function (knex) {
  return knex.schema.dropTable("section");
};

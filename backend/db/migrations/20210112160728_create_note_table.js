const { onUpdateTrigger } = require("../../knexfile");

exports.up = function (knex) {
  return knex.schema.createTable("note", (tbl) => {
    tbl.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    tbl.string("name", 100).notNullable();
    tbl.text("content").notNullable();
    tbl.integer("position").notNullable();
    // adds created_at, updated_at
    tbl.timestamps(true, true);
    tbl.uuid("section_id").notNullable().references("id").inTable("section");
  })
    .then(() => knex.raw(onUpdateTrigger("note")));
};

exports.down = function (knex) {
  return knex.schema.dropTable("note");
};

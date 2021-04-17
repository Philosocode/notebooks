const { onUpdateTrigger } = require("../../knexfile");

exports.up = function (knex) {
  return knex.schema.createTable("section", (tbl) => {
    tbl.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    tbl.string("name", 100).notNullable();
    tbl.integer("position").notNullable();
    // adds created_at, updated_at
    tbl.timestamps(true, true);
    tbl.jsonb("checklist").notNullable();
    tbl.uuid("notebook_id").notNullable().references("id").inTable("notebook");
  })
  .then(() => knex.raw(onUpdateTrigger("section")));
};

exports.down = function (knex) {
  return knex.schema.dropTable("section");
};

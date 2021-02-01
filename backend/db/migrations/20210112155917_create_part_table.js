exports.up = function (knex) {
  return knex.schema.createTable("part", (tbl) => {
    tbl.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    tbl.string("name", 100).notNullable();
    tbl.integer("position").notNullable();
    // adds created_at, updated_at
    tbl.timestamps(true, true);
    tbl.uuid("material_id").notNullable().references("id").inTable("material");
  })
  .then(() => knex.raw(onUpdateTrigger("part")));
};

exports.down = function (knex) {
  return knex.schema.dropTable("part");
};

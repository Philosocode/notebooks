exports.up = function (knex) {
  return knex.schema.createTable("material", (tbl) => {
    tbl.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    tbl.string("name", 100).notNullable();
    // adds created_at, updated_at
    tbl.timestamps(true, true);
    tbl.uuid("user_id").notNullable().references("id").inTable("user");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("material");
};

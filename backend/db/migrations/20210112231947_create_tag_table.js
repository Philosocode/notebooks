exports.up = function (knex) {
  return knex.schema.createTable("tag", (tbl) => {
    tbl.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    tbl.string("name", 100).unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tag");
};

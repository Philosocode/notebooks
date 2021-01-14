exports.up = function (knex) {
  return knex.schema.createTable("user", (tbl) => {
    tbl.string("google_id", 50).primary();
    tbl.string("name", 100).notNullable();
    tbl.string("email").notNullable();
    tbl.string("photo_url");
    tbl.timestamp("created_at").notNullable().defaultTo(knex.fn.now())
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user");
};

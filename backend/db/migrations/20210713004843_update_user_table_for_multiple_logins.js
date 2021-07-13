exports.up = function(knex) {
  return knex.schema.alterTable("user", function(table) {
    table.string("google_id").nullable().alter();
    table.string("password");
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("user", function(table) {
    table.string("google_id").notNullable().alter();
    table.dropColumn("password");
  });
};
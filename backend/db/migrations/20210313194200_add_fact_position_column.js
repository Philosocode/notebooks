exports.up = function(knex) {
  return knex.schema.table("fact", function(table) {
    table.integer("position").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.table("fact", function(table) {
    table.dropColumn("position");
  });
};

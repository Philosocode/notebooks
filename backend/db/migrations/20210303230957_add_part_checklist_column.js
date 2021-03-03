exports.up = function(knex) {
  return knex.schema.table("part", function(table) {
    table.jsonb("checklist").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.table("part", function(table) {
    table.dropColumn("checklist");
  })
};
exports.up = function(knex) {
  return knex.schema.table("hook", function(table) {
    table.renameColumn("name", "title");
  });
};

exports.down = function(knex) {
  return knex.schema.table("hook", function(table) {
    table.renameColumn("title", "name");
  }); 
};

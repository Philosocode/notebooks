const { defaultSettings } = require("../../handlers/user/user.common");

exports.up = function(knex=db) {
  return knex.schema.table("user", function(table) {
    table.jsonb("settings").notNullable().defaultTo(defaultSettings);
  });
};

exports.down = function(knex) {
  return knex.schema.table("user", function(table) {
    table.dropColumn("settings");
  })
};
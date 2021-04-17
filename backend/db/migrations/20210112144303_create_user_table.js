const { defaultSettings } = require("../../handlers/user/user.common");

exports.up = function (knex) {
  return knex.schema.createTable("user", (tbl) => {
    tbl.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    tbl.string("google_id", 50).notNullable().unique();
    tbl.string("name", 100).notNullable();
    tbl.string("email").notNullable().unique();
    tbl.string("photo_url");
    tbl.jsonb("settings").notNullable().defaultTo(defaultSettings);
    tbl.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user");
};

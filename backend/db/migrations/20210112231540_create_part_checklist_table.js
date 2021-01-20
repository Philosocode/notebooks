exports.up = function (knex) {
  return knex.schema.createTable("part_checklist", (tbl) => {
    tbl.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    tbl.boolean("skimmed").notNullable().defaultTo(false);
    tbl.boolean("practiced").notNullable().defaultTo(false);
    tbl.boolean("read").notNullable().defaultTo(false);
    tbl.boolean("encoded").notNullable().defaultTo(false);
    tbl.uuid("part_id").notNullable().references("id").inTable("part");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("part_checklist");
};

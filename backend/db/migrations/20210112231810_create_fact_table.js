exports.up = function (knex) {
  return knex.schema.createTable("fact", (tbl) => {
    tbl.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    tbl.text("question").notNullable();
    tbl.text("answer").notNullable();
    tbl.boolean("mastered").notNullable().defaultTo(false);
    tbl.uuid("part_id").notNullable().references("id").inTable("part");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("fact");
};

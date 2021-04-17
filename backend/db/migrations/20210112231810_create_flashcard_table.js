exports.up = function (knex) {
  return knex.schema.createTable("flashcard", (tbl) => {
    tbl.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    tbl.text("question").notNullable();
    tbl.text("answer").notNullable();
    tbl.boolean("mastered").notNullable().defaultTo(false);
    tbl.integer("position").notNullable();
    tbl.uuid("section_id").notNullable().references("id").inTable("section");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("flashcard");
};

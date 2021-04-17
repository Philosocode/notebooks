exports.up = function (knex) {
  return knex.schema.createTable("concept_section_link", (tbl) => {
    tbl.uuid("concept_id").notNullable().references("id").inTable("concept");
    tbl.uuid("section_id").notNullable().references("id").inTable("section");
    tbl.primary(["concept_id", "section_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("concept_section_link");
};

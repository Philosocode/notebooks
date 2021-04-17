exports.up = function (knex) {
  return knex.schema.createTable("concept_concept_link", (tbl) => {
    tbl.uuid("concept1_id").notNullable().references("id").inTable("concept");
    tbl.uuid("concept2_id").notNullable().references("id").inTable("concept");

    tbl.primary(["concept1_id", "concept2_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("concept_concept_link");
};

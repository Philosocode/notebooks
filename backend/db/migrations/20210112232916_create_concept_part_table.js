exports.up = function (knex) {
  return knex.schema.createTable("concept_part", (tbl) => {
    tbl.uuid("concept_id").notNullable().references("id").inTable("concept");
    tbl.uuid("part_id").notNullable().references("id").inTable("part");

    tbl.primary(["concept_id", "part_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("concept_part");
};

exports.up = function (knex) {
  return knex.schema.createTable("concept_tag", (tbl) => {
    tbl.uuid("concept_id").notNullable().references("id").inTable("concept");
    tbl.uuid("tag_id").notNullable().references("id").inTable("tag");

    tbl.primary(["concept_id", "tag_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("concept_tag");
};

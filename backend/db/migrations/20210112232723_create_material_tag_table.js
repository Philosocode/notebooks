exports.up = function (knex) {
  return knex.schema.createTable("material_tag", (tbl) => {
    tbl.uuid("material_id").notNullable().references("id").inTable("material");
    tbl.uuid("tag_id").notNullable().references("id").inTable("tag");

    tbl.primary(["material_id", "tag_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("material_tag");
};

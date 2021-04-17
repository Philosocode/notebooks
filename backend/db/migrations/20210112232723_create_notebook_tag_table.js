exports.up = function (knex) {
  return knex.schema.createTable("notebook_tag", (tbl) => {
    tbl.uuid("notebook_id").notNullable().references("id").inTable("notebook");
    tbl.uuid("tag_id").notNullable().references("id").inTable("tag");

    tbl.primary(["notebook_id", "tag_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("notebook_tag");
};

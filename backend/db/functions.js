// FROM: https://stackoverflow.com/a/48028011/9970553
const REMOVE_UNUSED_TAGS_FUNCTION = `
  CREATE OR REPLACE FUNCTION remove_unreferenced_concept_tags()
  RETURNS void AS $$
  BEGIN
    DELETE FROM tag
    WHERE NOT EXISTS
  END;
$$ language 'plpgsql';`;

const DROP_REMOVE_UNUSED_TAGS_FUNCTION = `DROP FUNCTION remove_unreferenced_concept_tags`;

exports.up = (knex) => knex.raw(REMOVE_UNUSED_TAGS_FUNCTION);
exports.down = (knex) => knex.raw(DROP_REMOVE_UNUSED_TAGS_FUNCTION);

await connection("tag")
    .whereNotExists(function () {
      this.select("tag_id")
        .from("concept_tag")
        .whereRaw("concept_tag.tag_id = tag.id");
    })
    .del();
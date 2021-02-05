// FROM: https://stackoverflow.com/a/48028011/9970553
const REMOVE_UNUSED_TAGS_FUNCTION = `
  CREATE OR REPLACE FUNCTION remove_unused_tags(tag_id uuid)
  RETURNS trigger AS $$
  BEGIN
    DELETE FROM tag
    WHERE id = tag_id
  END;
$$ language 'plpgsql';`;

const DROP_REMOVE_UNUSED_TAGS_FUNCTION = `DROP FUNCTION remove_unused_tags`;

exports.up = (knex) => knex.raw(REMOVE_UNUSED_TAGS_FUNCTION);
exports.down = (knex) => knex.raw(DROP_REMOVE_UNUSED_TAGS_FUNCTION);

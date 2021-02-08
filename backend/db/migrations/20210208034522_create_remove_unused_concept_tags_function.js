// FROM: https://stackoverflow.com/a/48028011/9970553
const REMOVE_UNREFERENCED_CONCEPT_TAGS_FUNCTION = `
  CREATE OR REPLACE FUNCTION remove_unreferenced_concept_tags()
  RETURNS void AS $$
  BEGIN
    DELETE FROM tag
    WHERE NOT EXISTS (
        SELECT tag_id
        FROM concept_tag
        WHERE concept_tag.tag_id = tag.id
    );
  END;
$$ language 'plpgsql';`;

const DROP_REMOVE_UNREFERENCED_CONCEPT_TAGS_FUNCTION = `DROP FUNCTION remove_unreferenced_concept_tags`;

exports.up = (knex) => knex.raw(REMOVE_UNREFERENCED_CONCEPT_TAGS_FUNCTION);
exports.down = (knex) => knex.raw(DROP_REMOVE_UNREFERENCED_CONCEPT_TAGS_FUNCTION);

const db = require("../db");

const UNIQUE_HOOK_POSITION_CONSTRAINT = `
  ALTER TABLE hook
  ADD CONSTRAINT "unique_hook_position"
  UNIQUE(id, position)
  DEFERRABLE INITIALLY DEFERRED;
`;

const DROP_UNIQUE_HOOK_POSITION_CONSTRAINT = `
  ALTER TABLE hook DROP CONSTRAINT "unique_hook_position"
`;

exports.up = (knex) => knex.raw(UNIQUE_HOOK_POSITION_CONSTRAINT);
exports.down = (knex) => knex.raw(DROP_UNIQUE_HOOK_POSITION_CONSTRAINT);

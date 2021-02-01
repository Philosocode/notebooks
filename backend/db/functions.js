module.exports = {
  onUpdateTrigger,
}

// FROM: https://stackoverflow.com/a/48028011/9970553
exports.onUpdateTrigger = function(table) {
  return `CREATE TRIGGER ${table}_updated_at
          BEFORE UPDATE ON ${table}
          FOR EACH ROW
          EXECUTE PROCEDURE on_update_timestamp();`;
}
const { getMaxPosition } = require("../../common/common.model");
const db = require("../../db/db");

exports.getValidInsertPosition = async function (
  concept_id,
  position,
  canAppendToEnd,
  connection = db
) {
  if (position < 1) return 1;

  // ensure user can't insert beyond the max position
  const maxPosition = await getMaxPosition("hook", { concept_id }, connection);
  
  // +1 so insert after last item is possible
  if (canAppendToEnd && position > maxPosition) return maxPosition + 1;
  else if (position > maxPosition) return maxPosition;

  return position;
};

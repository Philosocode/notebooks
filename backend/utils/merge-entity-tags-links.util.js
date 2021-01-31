
/**
 * Example Input:
 * [
 *    { id: 1, tag: "a" },
 *    { id: 1, tag: "b" },
 *    { id: 2, tag: "c" },
 *    { id: 2, tag: "d" },
 * ]
 * 
 * Example Output:
 * [
 *    { id: 1, tag: ["a", "b"] },
 *    { id: 2, tag: ["c", "d"] },
 * ]
 */
// https://stackoverflow.com/a/59741159
module.exports = function mergeEntityWithTagsAndLinks(flatData) {
  // each key corresponds with an entity ID
  const mergedObj = flatData.reduce((merged, currRow) => {
    const entityId = currRow.id;

    if (!merged[entityId]) {
      merged[entityId] = {
        ...currRow,
        tags: [],
        links: [],
      };

      delete merged[entityId]["tag"];
      delete merged[entityId]["link"];
    }

    if (currRow.tag)  merged[entityId].tags.push(currRow.tag);
    if (currRow.link) merged[entityId].links.push(currRow.link);

    return merged;
  }, {});

  // convert map OBJ into an ARR with each individual entity
  return Object.values(mergedObj);
}
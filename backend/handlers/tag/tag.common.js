module.exports = {
  getTagsDiff,
  mergeEntityWithTags,
}

function getTagsDiff(currTags, updatedTags) {
    // use objects for O(1) lookups
    const currTagsHash = {};
    const updatedTagsHash = {};

    const mostTags = Math.max(currTags.length, updatedTags.length);
  
    for (let i = 0; i < mostTags; i++) {
      if (currTags[i])    currTagsHash[currTags[i]] = true;
      if (updatedTags[i]) updatedTagsHash[updatedTags[i]] = true;
    }
  
    // check which tags need to be added or removed
    const tagsToCreate = [];
    const tagsToDelete = [];
  
    updatedTags.forEach(tn => {
      // new tag not in curr tags: need to add
      // e.g. currTags=[a,b,c], newTag=d
      if (!currTagsHash[tn]) tagsToCreate.push(tn);
    });
  
    currTags.forEach(tn => {
      // a curr tag is not in the updated tags: need to remove
      if (!updatedTagsHash[tn]) tagsToDelete.push(tn);
    });

    return {
      tagsToCreate,
      tagsToDelete,
    }
}

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
function mergeEntityWithTags(flatData) {
  // each key corresponds with an entity ID
  const mergedObj = flatData.reduce((merged, currRow) => {
    const entityId = currRow.id;

    if (!merged[entityId]) {
      merged[entityId] = {
        ...currRow,
        tags: [],
      };

      delete merged[entityId]["tag"];
    }

    if (currRow.tag)  merged[entityId].tags.push(currRow.tag);

    merged[entityId].tags.sort();

    return merged;
  }, {});

  // convert map OBJ into an ARR with each individual entity
  return Object.values(mergedObj);
}

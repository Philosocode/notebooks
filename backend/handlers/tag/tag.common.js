module.exports = {
  getTagsDiff,
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
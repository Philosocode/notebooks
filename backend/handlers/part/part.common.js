const defaultPartChecklist = {
  "Skim through the material": false,
  "Attempt practice problems": false,
  "Finish part": false,
  "Create facts": false,
};

const partChecklistKeys = Object.keys(defaultPartChecklist);

module.exports = {
  defaultPartChecklist,
  partChecklistKeys,
};
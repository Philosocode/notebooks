const defaultSectionChecklist = {
  "Skim through the notebook": false,
  "Attempt practice problems": false,
  "Finish the notebook": false,
  "Create flashcards": false,
};

const sectionChecklistKeys = Object.keys(defaultSectionChecklist);

module.exports = {
  defaultSectionChecklist,
  sectionChecklistKeys,
};
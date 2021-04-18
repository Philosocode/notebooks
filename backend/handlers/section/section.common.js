const defaultSectionChecklist = {
  "Skim through the material": false,
  "Attempt practice problems": false,
  "Go through the material": false,
  "Create flashcards": false,
};

const sectionChecklistKeys = Object.keys(defaultSectionChecklist);

module.exports = {
  defaultSectionChecklist,
  sectionChecklistKeys,
};
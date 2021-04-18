const db = require("../db/db");

module.exports = {
  conceptSectionLinkExists,
  createConceptSectionLink,
  deleteConceptSectionLink,
  deleteConceptSectionLinksForSection,
  deleteConceptSectionLinksForNotebook,
  deleteConceptSectionLinksForConcept,
  getConceptSectionLinksForSection,
};

async function conceptSectionLinkExists(concept_id, section_id, connection=db) {
  const res = await connection.first(
    connection.raw(
      "exists ? as exists",
      connection("concept_section_link")
        .select("concept_id")
        .where({ concept_id, section_id })
    )
  );

  return res.exists;
}

async function createConceptSectionLink(concept_id, section_id, connection=db) {
  return connection("concept_section_link")
    .insert({ concept_id, section_id })
    .returning("*");
}

async function deleteConceptSectionLink(concept_id, section_id, connection = db) {
  return connection("concept_section_link")
    .where({ concept_id, section_id })
    .del();
}

async function deleteConceptSectionLinksForSection(section_id, connection=db) {
  return connection("concept_section_link")
    .where({ section_id })
    .del();
}

async function deleteConceptSectionLinksForConcept(concept_id, connection=db) {
  return connection("concept_section_link")
    .where({ concept_id })
    .del();
}

async function deleteConceptSectionLinksForNotebook(notebook_id, connection=db) {
  // delete where concept_section_link.section_id is in...
  return connection("concept_section_link").whereIn("section_id", function() {
    // select sections with the notebook ID
    this.select("id")
      .from("section")
      .where({ "section.notebook_id": notebook_id });
  }).del();
}

async function getConceptSectionLinksForSection(section_id, connection=db) {
  return connection("concept_section_link")
    .where({ section_id });
}
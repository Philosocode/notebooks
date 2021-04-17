const db = require("../db/db");

module.exports = {
  conceptSectionLinkExists,
  createConceptSectionLink,
  deleteConceptSectionLink,
  deleteConceptSectionLinksForSection,
  deleteConceptSectionLinksForMaterial,
  deleteConceptSectionLinksForConcept,
  getConceptSectionLinksForSection,
};

async function conceptSectionLinkExists(concept_id, section_id, connection=db) {
  const res = await connection.first(
    connection.raw(
      "exists ? as exists",
      connection("concept_section")
        .select("concept_id")
        .where({ concept_id, section_id })
    )
  );

  return res.exists;
}

async function createConceptSectionLink(concept_id, section_id, connection=db) {
  return connection("concept_section")
    .insert({ concept_id, section_id })
    .returning("*");
}

async function deleteConceptSectionLink(concept_id, section_id, connection = db) {
  return connection("concept_section")
    .where({ concept_id, section_id })
    .del();
}

async function deleteConceptSectionLinksForSection(section_id, connection=db) {
  return connection("concept_section")
    .where({ section_id })
    .del();
}

async function deleteConceptSectionLinksForConcept(concept_id, connection=db) {
  return connection("concept_section")
    .where({ concept_id })
    .del();
}

async function deleteConceptSectionLinksForMaterial(material_id, connection=db) {
  // delete where concept_section.section_id is in...
  return connection("concept_section").whereIn("section_id", function() {
    // select sections with the material ID
    this.select("id")
      .from("section")
      .where({ "section.material_id": material_id });
  }).del();
}

async function getConceptSectionLinksForSection(section_id, connection=db) {
  return connection("concept_section")
    .where({ section_id });
}
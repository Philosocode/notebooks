exports.processConceptConceptLinks = function processConceptConceptLinks(concept_id, flatLinks) {
  /**
   * IN: [ { id, concept1_id, concept2_id } ]
   * OUT: [ { id, concept_id } ]
   */
  return flatLinks.map(link => {
    let otherConceptId;
    if (link.concept1_id === concept_id) {
      otherConceptId = link.concept2_id;
    } else {
      otherConceptId = link.concept1_id;
    }

    return { id: link.id, concept_id: otherConceptId };
  });
}
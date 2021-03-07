import React, { useEffect, useMemo } from "react";

import { IPart } from "../redux/part.types";
import { useDispatch, useSelector } from "react-redux";
import { getConceptParts } from "../../concept-link/redux/concept-link.thunks";
import { selectConcepts } from "../../concept/redux/concept.selectors";
import { selectConceptsLoaded } from "../../shared/redux/init.selectors";
import { getConcepts } from "../../concept/redux/concept.thunks";

interface IProps {
  part: IPart;
}
export const ConceptParts: React.FC<IProps> = ({ part }) => {
  const dispatch = useDispatch();
  const conceptsLoaded = useSelector(selectConceptsLoaded);
  const concepts = useSelector(selectConcepts);

  useEffect(() => {
    if (!conceptsLoaded) {
      dispatch(getConcepts());
    }
  }, []);

  useEffect(() => {
    if (!part.conceptIds) {
      dispatch(getConceptParts(part.id));
    }
  }, [part, dispatch]);

  const linkedConcepts = useMemo(() => {
    if (!part.conceptIds) return [];

    const conceptsWithId = [];

    for (let i = 0 ; i < part.conceptIds.length; i++) {
      const conceptId = part.conceptIds[i];

      const concept = concepts.find(c => {
        return c.id === conceptId
      });

      if (concept) {
        conceptsWithId.push(concept);
      }
    }

    return concepts;
  }, [part.conceptIds, dispatch]);

  if (!part.conceptIds) return null;

  return (
    <div>
      {
        linkedConcepts.map(c => (
          <div key={c.id}>{c.name}</div>
        ))
      }
    </div>
  );
}
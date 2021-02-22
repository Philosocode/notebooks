import React, { useEffect } from "react";

import { IConcept } from "../redux/concept.types";
import { useDispatch, useSelector } from "react-redux";

// logic
import { selectConceptLinks } from "../redux/concept.selectors";
import { getConceptLinks } from "../redux/concept.thunks";

// styles
import { LinkGrid } from "../../shared/components/link/link-grid.component";

interface IProps {
  concept: IConcept;
}
export const ConceptLinks: React.FC<IProps> = ({ concept }) => {
  const conceptLinks = useSelector(selectConceptLinks);
  const dispatch = useDispatch();

  useEffect(() => {
    if (conceptLinks === undefined) {
      dispatch(getConceptLinks(concept.id));
    }
  }, [conceptLinks, dispatch]);

  const linkGridItems = conceptLinks?.map(conceptLink => {
    return {
      id: conceptLink.id,
      name: conceptLink.name,
      url: `/concepts/${conceptLink.id}`
    };
  }) ?? [];

  return (
    <LinkGrid links={linkGridItems} />
  )
}
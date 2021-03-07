import React, { useEffect, useMemo } from "react";

import { IPart } from "../redux/part.types";
import { useDispatch, useSelector } from "react-redux";
import { getConceptParts } from "../../concept-link/redux/concept-link.thunks";
import { selectConcepts } from "../../concept/redux/concept.selectors";
import { selectConceptsLoaded } from "../../shared/redux/init.selectors";
import { getConcepts } from "../../concept/redux/concept.thunks";
import { SHeadingSubSubtitle } from "../../shared/styles/typography.style";
import { ILinkGridItem } from "../../shared/components/link/link-grid-item.component";
import { LinkGrid } from "shared/components/link/link-grid.component";
import { FloatingCornerButton } from "shared/components/button/floating-corner-button.component";

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

  const linkGridItems = useMemo(() => {
    if (!part.conceptIds) return [];

    const items: ILinkGridItem[] = [];

    for (let i = 0 ; i < part.conceptIds.length; i++) {
      const conceptId = part.conceptIds[i];

      const concept = concepts.find(c => {
        return c.id === conceptId
      });

      if (concept) {
        items.push({
          currentId: part.id,
          otherId: concept.id,
          name: concept.name,
          url: `/concepts/${concept.id}`
        })
      }
    }

    // sort in alphabetical order
    return items.sort((a,b) => (a.name < b.name) ? -1 : 1);
  }, [part.conceptIds, part.id, concepts]);

  if (!part.conceptIds) return null;

  return (
    <div>
      {
        part.conceptIds.length === 0 && (
          <SHeadingSubSubtitle weight={500}>No links found.</SHeadingSubSubtitle>
        )
      }
      <LinkGrid links={linkGridItems} handleDelete={() => {}} />
      <FloatingCornerButton handleClick={() => {}} icon="plus" />
    </div>
  );
}
import React, { useEffect, useMemo } from "react";

import { IPart } from "../redux/part.types";
import { useDispatch, useSelector } from "react-redux";
import { createConceptPart, deleteConceptPart, getConceptParts } from "../../concept-link/redux/concept-link.thunks";
import { selectConceptHash } from "../../concept/redux/concept.selectors";
import { selectConceptsLoaded } from "../../shared/redux/init.selectors";
import { getConcepts } from "../../concept/redux/concept.thunks";
import { SHeadingSubSubtitle } from "../../shared/styles/typography.style";
import { ILinkGridItem } from "../../shared/components/link/link-grid-item.component";
import { LinkGrid } from "shared/components/link/link-grid.component";
import { FloatingCornerButton } from "shared/components/button/floating-corner-button.component";
import { useToggle } from "shared/hooks/use-toggle.hook";
import { CreateConceptLinkModal } from "concept-link/components/create-concept-link-modal.component";
import { sortEntitiesByKey } from "../../shared/utils/entity.util";

interface IProps {
  part: IPart;
}
export const ConceptParts: React.FC<IProps> = ({ part }) => {
  const dispatch = useDispatch();
  const conceptsLoaded = useSelector(selectConceptsLoaded);
  const conceptHash = useSelector(selectConceptHash);
  const conceptList = Object.values(conceptHash);

  const [createModalShowing, toggleCreateModalShowing] = useToggle(false);

  useEffect(() => {
    if (!conceptsLoaded) {
      dispatch(getConcepts());
    }
  }, [conceptsLoaded, dispatch]);

  useEffect(() => {
    if (!part.conceptIds) {
      dispatch(getConceptParts(part.id));
    }
  }, [part, dispatch]);

  function handleCreate(conceptId: string) {
    dispatch(createConceptPart({
      conceptId,
      part,
    }));
  }

  function handleDelete(_: string, conceptId: string) {
    dispatch(deleteConceptPart({
      conceptId,
      part,
    }));
  }

  const linkGridItems = useMemo(() => {
    if (!part.conceptIds || Object.keys(conceptHash).length === 0) return [];

    const items: ILinkGridItem[] = [];

    for (let i = 0 ; i < part.conceptIds.length; i++) {
      console.log(part.conceptIds);
      const conceptId = part.conceptIds[i];

      const concept = conceptHash[conceptId];
      items.push({
        currentId: part.id,
        otherId: concept.id,
        name: concept.name,
        url: `/concepts/${concept.id}`
      });
    }

    // sort in alphabetical order
    return sortEntitiesByKey(items, "name");
  }, [part.conceptIds, part.id, conceptHash]);

  const unlinkedConcepts = sortEntitiesByKey(
    conceptList.filter(c => !part.conceptIds?.includes(c.id)),
    "name"
  );

  if (!part.conceptIds) return null;
  return (
    <div>
      {
        part.conceptIds.length === 0 && (
          <SHeadingSubSubtitle weight={500}>No links found.</SHeadingSubSubtitle>
        )
      }
      <LinkGrid links={linkGridItems} handleDelete={handleDelete} />
      <FloatingCornerButton handleClick={toggleCreateModalShowing} icon="plus" />
      <CreateConceptLinkModal
        handleClose={toggleCreateModalShowing}
        handleCreate={handleCreate}
        unlinkedEntities={unlinkedConcepts}
        modalShowing={createModalShowing}
      />
    </div>
  );
}
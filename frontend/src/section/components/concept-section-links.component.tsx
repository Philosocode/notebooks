import React, { useEffect, useMemo } from "react";

import { ISection } from "../redux/section.types";
import { useDispatch, useSelector } from "react-redux";
import { createConceptSection, deleteConceptSection, getConceptSections } from "../../concept-link/redux/concept-link.thunks";
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
  section: ISection;
}
export const ConceptSectionLinks: React.FC<IProps> = ({ section }) => {
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
    if (!section.conceptIds) {
      dispatch(getConceptSections(section.id));
    }
  }, [section, dispatch]);

  function handleCreate(conceptId: string) {
    dispatch(createConceptSection({
      conceptId,
      section,
    }));
  }

  function handleDelete(_: string, conceptId: string) {
    dispatch(deleteConceptSection({
      conceptId,
      section,
    }));
  }

  const linkGridItems = useMemo(() => {
    if (!section.conceptIds || Object.keys(conceptHash).length === 0) return [];

    const items: ILinkGridItem[] = [];

    for (let i = 0 ; i < section.conceptIds.length; i++) {
      const conceptId = section.conceptIds[i];

      const concept = conceptHash[conceptId];
      items.push({
        currentId: section.id,
        otherId: concept.id,
        name: concept.name,
        url: `/concepts/${concept.id}`
      });
    }

    // sort in alphabetical order
    return sortEntitiesByKey(items, "name");
  }, [section.conceptIds, section.id, conceptHash]);

  const unlinkedConcepts = sortEntitiesByKey(
    conceptList.filter(c => !section.conceptIds?.includes(c.id)),
    "name"
  );

  if (!section.conceptIds) return null;
  return (
    <div>
      {
        section.conceptIds.length === 0 && (
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
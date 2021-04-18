import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// logic
import { IConcept } from "../redux/concept.types";
import { selectConceptConceptLinks, selectConceptList } from "../redux/concept.selectors";
import { createConceptConceptLink, deleteConceptConceptLink, getConceptConceptLinks } from "../redux/concept.thunks";
import { sortEntitiesByKey } from "../../shared/utils/entity.util";
import { useToggle } from "../../shared/hooks/use-toggle.hook";

// components
import { CreateConceptLinkModal } from "../../concept-link/components/create-concept-link-modal.component";
import { FloatingCornerButton } from "shared/components/button/floating-corner-button.component";
import { LinkGrid } from "shared/components/link/link-grid.component";

// styles
import { SHeadingSubSubtitle } from "shared/styles/typography.style";

interface IProps {
  concept: IConcept;
}
export const ConceptConceptLinks: React.FC<IProps> = ({ concept }) => {
  const concepts = useSelector(selectConceptList);
  const conceptConceptConceptLinks = useSelector(selectConceptConceptLinks);
  const dispatch = useDispatch();
  const [createModalShowing, toggleCreateModalShowing] = useToggle(false);

  useEffect(() => {
    if (conceptConceptConceptLinks === undefined) {
      dispatch(getConceptConceptLinks(concept.id));
    }
  }, [concept.id, conceptConceptConceptLinks, dispatch]);

  function handleLinkCreate(otherId: string) {
    dispatch(createConceptConceptLink({
      currentConceptId: concept.id,
      otherConceptId: otherId,
    }));
  }

  function handleLinkDelete(linkId: string, conceptId: string) {
    dispatch(deleteConceptConceptLink({
      currentConceptId: concept.id,
      otherConceptId: conceptId,
      linkId,
    }));
  }

  const linkGridItems = conceptConceptConceptLinks?.map(conceptConceptConceptLink => {
    return {
      currentId: conceptConceptConceptLink.id,
      otherId: concept.id,
      name: conceptConceptConceptLink.concept_name,
      url: `/concepts/${conceptConceptConceptLink.concept_id}`,
    };
  }).sort((a,b) => {
    if (a.name > b.name) return 1;
    return -1;
  }) ?? [];

  const unlinkedConcepts = sortEntitiesByKey(
    Object.values(concepts).filter(c => {
      // can't link concept with itself
      if (c.id === concept.id) return false;

      return !conceptConceptConceptLinks?.some(link => link.concept_id === c.id)
    }),
    "name"
  );

  return (
    <>
      {
        linkGridItems.length === 0 && (
          <SHeadingSubSubtitle weight={500}>No links found.</SHeadingSubSubtitle>
        )
      }
      <LinkGrid links={linkGridItems} handleDelete={handleLinkDelete} />
      <FloatingCornerButton handleClick={toggleCreateModalShowing} icon="plus" />
      <CreateConceptLinkModal
        handleClose={toggleCreateModalShowing}
        handleCreate={handleLinkCreate}
        unlinkedEntities={unlinkedConcepts}
        modalShowing={createModalShowing}
      />
    </>
  );
};
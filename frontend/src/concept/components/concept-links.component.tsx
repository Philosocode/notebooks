import React, { useEffect } from "react";

import { IConcept } from "../redux/concept.types";
import { useDispatch, useSelector } from "react-redux";

// logic
import { selectConceptLinks } from "../redux/concept.selectors";
import { deleteConceptLink, getConceptLinks } from "../redux/concept.thunks";
import { showModal } from "modal/redux/modal.slice";

// styles
import { LinkGrid } from "../../shared/components/link/link-grid.component";
import { SHeadingSubSubtitle } from "../../shared/styles/typography.style";
import { FloatingCornerButton } from "../../shared/components/button/floating-corner-button.component";

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
  }, [concept.id, conceptLinks, dispatch]);

  function handleLinkDelete(linkId: string, conceptId: string) {
    dispatch(deleteConceptLink({
      currentConceptId: concept.id,
      otherConceptId: conceptId,
      linkId,
    }));
  }

  function showCreateConceptLinkModal() {
    dispatch(showModal({
      modalType: "create-concept-link",
      modalProps: {
        currentConcept: concept,
      }
    }));
  }

  const linkGridItems = conceptLinks?.map(conceptLink => {
    return {
      link_id: conceptLink.id,
      ownerEntityId: concept.id,
      name: conceptLink.concept_name,
      url: `/concepts/${conceptLink.concept_id}`,
      handleDelete: handleLinkDelete,
    };
  }).sort((a,b) => {
    if (a.name > b.name) return 1;
    return -1;
  }) ?? [];

  return (
    <>
      {
        linkGridItems.length === 0 && (
          <SHeadingSubSubtitle weight={500}>No links found.</SHeadingSubSubtitle>
        )
      }
      <LinkGrid links={linkGridItems} />
      <FloatingCornerButton handleClick={showCreateConceptLinkModal} icon="plus" />
    </>
  );
};
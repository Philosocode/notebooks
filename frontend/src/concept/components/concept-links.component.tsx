import React, { useEffect } from "react";

import { IConcept } from "../redux/concept.types";
import { useDispatch, useSelector } from "react-redux";

// logic
import { selectConceptLinks } from "../redux/concept.selectors";
import { deleteConceptLink, getConceptLinks } from "../redux/concept.thunks";

// styles
import { LinkGrid } from "../../shared/components/link/link-grid.component";
import { SHeadingSubSubtitle } from "../../shared/styles/typography.style";

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

  function handleLinkDelete(linkId: string, conceptId: string) {
    dispatch(deleteConceptLink({
      conceptId,
      linkId,
    }));
  }

  const linkGridItems = conceptLinks?.map(conceptLink => {
    return {
      link_id: conceptLink.id,
      ownerEntityId: conceptLink.concept_id,
      name: conceptLink.concept_name,
      url: `/concepts/${conceptLink.concept_id}`,
      handleDelete: handleLinkDelete,
    };
  }) ?? [];

  if (linkGridItems.length === 0) return (
    <SHeadingSubSubtitle style={{ fontWeight: 500 }}>No links found.</SHeadingSubSubtitle>
  );

  return (
    <LinkGrid links={linkGridItems} />
  )
}
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { getConcepts } from "concept/redux/concept.thunks";
import { showModal } from "modal/redux/modal.slice";
import { selectModalShowing } from "modal/redux/modal.selectors";
import { selectConceptFilters, selectConceptTags } from "concept/redux/concept.selectors";
import { setConceptFilters, setCurrentConceptTag } from "concept/redux/concept.slice";

import { ConceptList } from "concept/components/concept-list.component";
import { FloatingAddButton } from "shared/components/button/floating-add-button.component";
import { TagSidebar } from "concept/components/tag-sidebar.component";
import { theme } from "shared/styles/theme.style";

export const ConceptsPage = () => {
  const dispatch = useDispatch();
  const modalShowing = useSelector(selectModalShowing);
  const conceptTags = useSelector(selectConceptTags);
  const filters = useSelector(selectConceptFilters);

  useEffect(() => {
    dispatch(getConcepts());
  }, [dispatch]);

  function handleSetTag(tag: string) {
    dispatch(setCurrentConceptTag(tag));
  }

  function showAddConceptModal() {
    if (modalShowing) return;

    dispatch(
      showModal({
        modalType: "create-concept",
        modalProps: {
          concept: undefined,
        },
      })
    );
  };

  function handleSetUncategorized() {
    dispatch(setConceptFilters({ isUncategorized: true, tag: undefined }))
  }

  return (
    <SPage>
      <TagSidebar
        filters={filters}
        tags={conceptTags}
        setCurrentTag={handleSetTag}
        setUncategorized={handleSetUncategorized}
      />
      <SConceptSection>
        <SHeading>Concepts</SHeading>
        <ConceptList />
        <FloatingAddButton handleClick={showAddConceptModal} />
      </SConceptSection>
    </SPage>
  );
};

const SPage = styled.div`
  display: flex;
`;

const SHeading = styled.h1`
  font-size: ${theme.fontSizes.lg};
  padding: ${theme.spacing.md};
`;

const SConceptSection = styled.section`
  width: 100%;
`;

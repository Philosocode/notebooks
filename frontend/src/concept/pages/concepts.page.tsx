import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { showModal } from "modal/redux/modal.slice";
import { selectModalShowing } from "modal/redux/modal.selectors";
import { selectConceptFilters, selectConceptsWithCurrentTag, selectConceptTags } from "concept/redux/concept.selectors";
import { setConceptFilters, setCurrentConceptTag } from "concept/redux/concept.slice";

import { ConceptList } from "concept/components/concept-list.component";
import { FloatingCornerButton } from "shared/components/button/floating-corner-button.component";
import { TagSidebar } from "concept/components/tag-sidebar.component";
import { theme } from "shared/styles/theme.style";
import { SortFilterControls } from "../../shared/components/button/sort-filter-controls.component";
import { useEntityFilterSort } from "../../shared/hooks/use-entity-filter-sort.hook";
import { IConcept } from "../redux/concept.types";
import { SHeadingSubSubtitle, SHeadingSubtitle } from "../../shared/styles/typography.style";

export const ConceptsPage = () => {
  const dispatch = useDispatch();
  const modalShowing = useSelector(selectModalShowing);
  const conceptTags = useSelector(selectConceptTags);
  const filters = useSelector(selectConceptFilters);

  const conceptsWithTag = useSelector(selectConceptsWithCurrentTag);
  const {
    handleFilterTextChange,
    handleSortClick,
    getSortIconCaret,
    filterText,
    filteredEntities: filteredConcepts,
    sortMode,
  } = useEntityFilterSort<IConcept>(conceptsWithTag, "name", "alphabetical");

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
        <SPaddedContainer>
          <SHeadingSubtitle>Concepts</SHeadingSubtitle>
          <SortFilterControls
            filterText={filterText}
            getIcon={getSortIconCaret}
            handleFilterTextChange={handleFilterTextChange}
            handleSortClick={handleSortClick}
            sortMode={sortMode}
            isCentered={false}
          />
          { filteredConcepts.length === 0 && <SNotFoundHeading>No concepts found.</SNotFoundHeading> }
        </SPaddedContainer>

        <ConceptList concepts={filteredConcepts} />
        <FloatingCornerButton
          icon="plus"
          handleClick={showAddConceptModal}
        />
      </SConceptSection>
    </SPage>
  );
};

const SPage = styled.div`
  display: flex;
`;

const SConceptSection = styled.section`
  width: 100%;
`;

const SPaddedContainer = styled.div`
  padding: ${theme.spacing.md};
`;

const SNotFoundHeading = styled(SHeadingSubSubtitle)`
  font-weight: 500;
  margin-top: ${theme.spacing.base};
`;
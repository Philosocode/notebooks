import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { showModal } from "modal/redux/modal.slice";
import { selectModalShowing } from "modal/redux/modal.selectors";
import { selectConceptFilters, selectConceptsWithCurrentTag, selectConceptTags } from "concept/redux/concept.selectors";
import { selectConceptsLoaded } from "shared/redux/init.selectors";
import { setConceptFilters, setCurrentConceptTag } from "concept/redux/concept.slice";
import { useEntityFilterSort } from "shared/hooks/use-entity-filter-sort.hook";

import { ConceptList } from "concept/components/concept-list.component";
import { FloatingCornerButton } from "shared/components/button/floating-corner-button.component";
import { TagSidebar } from "concept/components/tag-sidebar.component";
import { SortFilterControls } from "shared/components/button/sort-filter-controls.component";

import { theme } from "shared/styles/theme.style";
import { SHeadingSubSubtitle, SHeadingSubtitle } from "shared/styles/typography.style";
import { IEntityFilter } from "../shared/types.shared";
import { useTagFilter } from "../shared/hooks/use-tag-filter.hook";

export const MaterialsPage = () => {
  // const dispatch = useDispatch();
  const { setCurrentTag, setIsUncategorized, isUncategorized, currentTag } = useTagFilter();

  // const modalShowing = useSelector(selectModalShowing);
  // const conceptTags = useSelector(selectConceptTags);
  // const filters = useSelector(selectConceptFilters);
  // const conceptsLoaded = useSelector(selectConceptsLoaded);

  // const conceptsWithTag = useSelector(selectConceptsWithCurrentTag);
  // const {
  //   handleFilterTextChange,
  //   handleSortClick,
  //   getSortIconCaret,
  //   filterText,
  //   filteredEntities: filteredConcepts,
  //   sortMode,
  // } = useEntityFilterSort<IConcept>(conceptsWithTag, "name", "updated");

  // useEffect(() => {
  //   if (!conceptsLoaded) {
  //     dispatch(getConcepts());
  //   }
  // }, [conceptsLoaded, dispatch]);

  // function handleSetTag(tag: string) {
  //   dispatch(setCurrentConceptTag(tag));
  // }

  // function showAddConceptModal() {
  //   if (modalShowing) return;
  //
  //   dispatch(
  //     showModal({
  //       modalType: "create-concept",
  //       modalProps: {
  //         concept: undefined,
  //       },
  //     })
  //   );
  // };

  // function handleSetUncategorized() {
  //   dispatch(setConceptFilters({ isUncategorized: true, tag: undefined }))
  // }

  return (
    <SPage>
      <TagSidebar
        tags={["a", "b", "c"]}
        currentTag={currentTag}
        isUncategorized={isUncategorized}
        setCurrentTag={setCurrentTag}
        setUncategorized={setIsUncategorized}
      />
      <SConceptSection>
        <SPaddedContainer>
          <SHeadingSubtitle>Materials</SHeadingSubtitle>
          {/*<SortFilterControls*/}
          {/*  filterText={filterText}*/}
          {/*  getIcon={getSortIconCaret}*/}
          {/*  handleFilterTextChange={handleFilterTextChange}*/}
          {/*  handleSortClick={handleSortClick}*/}
          {/*  sortMode={sortMode}*/}
          {/*  isCentered={false}*/}
          {/*/>*/}
          {/*{ filteredConcepts.length === 0 && <SNotFoundHeading>No concepts found.</SNotFoundHeading> }*/}
        </SPaddedContainer>

        {/*<ConceptList concepts={filteredConcepts} />*/}
        <FloatingCornerButton
          icon="plus"
          handleClick={() => {}}
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
  height: calc(100vh - ${theme.componentSizes.navbarHeight});
  overflow: auto;
`;

const SPaddedContainer = styled.div`
  padding: ${theme.spacing.md};
`;

const SNotFoundHeading = styled(SHeadingSubSubtitle)`
  font-weight: 500;
  margin-top: ${theme.spacing.base};
`;
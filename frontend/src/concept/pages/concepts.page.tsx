import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// logic
import { IConcept } from "../redux/concept.types";
import { showModal } from "modal/redux/modal.slice";
import { selectModalShowing } from "modal/redux/modal.selectors";
import { selectConceptList, selectConceptTags } from "concept/redux/concept.selectors";
import { selectConceptsLoaded } from "shared/redux/init.selectors";
import { useEntityFilterSort } from "../../shared/hooks/use-entity-filter-sort.hook";
import { useTagFilter } from "shared/hooks/use-tag-filter.hook";
import { getConcepts } from "../redux/concept.thunks";

// components
import { ConceptList } from "concept/components/concept-list.component";
import { FloatingCornerButton } from "shared/components/button/floating-corner-button.component";
import { TagSidebar } from "tag/components/tag-sidebar.component";
import { SortFilterControls } from "shared/components/button/sort-filter-controls.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SHeadingSubSubtitle, SHeadingSubtitle } from "shared/styles/typography.style";

export const ConceptsPage: React.FC = () => {
  const dispatch = useDispatch();
  const modalShowing = useSelector(selectModalShowing);
  const conceptsLoaded = useSelector(selectConceptsLoaded);
  const concepts = useSelector(selectConceptList);
  const conceptTags = useSelector(selectConceptTags);

  const { setIsUncategorized, isUncategorized, currentTag, setCurrentTag } = useTagFilter();

  const conceptsWithTag = useMemo(() => {
    if (isUncategorized) return concepts.filter(c => c.tags.length === 0);
    if (!currentTag) return concepts;

    return concepts.filter(c => c.tags.includes(currentTag));
  }, [concepts, isUncategorized, currentTag]);

  const {
    handleFilterTextChange,
    handleSortClick,
    getSortIconCaret,
    filterText,
    filteredEntities: filteredConcepts,
    sortMode,
  } = useEntityFilterSort<IConcept>(conceptsWithTag, "name", "updated");

  useEffect(() => {
    if (!conceptsLoaded) {
      dispatch(getConcepts());
    }
  }, [conceptsLoaded, dispatch]);

  function showCreateConceptModal() {
    if (modalShowing) return;

    dispatch(
      showModal({
        modalType: "create-concept",
        modalProps: {
          concept: undefined,
        },
      })
    );
  }

  return (
    <SPage>
      <TagSidebar
        isUncategorized={isUncategorized}
        currentTag={currentTag}
        tags={conceptTags}
        setCurrentTag={setCurrentTag}
        setUncategorized={setIsUncategorized}
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
          handleClick={showCreateConceptModal}
        />
      </SConceptSection>
    </SPage>
  );
};

const SPage = styled.div`
  display: flex;
  padding-bottom: ${theme.spacing.listBottomPadding};
`;

const SConceptSection = styled.section`
  width: 100%;
  height: calc(100vh - ${theme.componentSizes.navbarHeight});
  overflow: auto;
`;

const SPaddedContainer = styled.div`
  padding: ${theme.spacing.base};
  
  ${theme.media.tabLand} {
    padding: ${theme.spacing.md};
  }
`;

const SNotFoundHeading = styled(SHeadingSubSubtitle)`
  font-weight: 500;
  margin-top: ${theme.spacing.base};
`;
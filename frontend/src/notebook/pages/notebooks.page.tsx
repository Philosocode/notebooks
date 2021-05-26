import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// logic
import { INotebook } from "../redux/notebook.types";
import { useTagFilter } from "shared/hooks/use-tag-filter.hook";
import { getNotebooks } from "../redux/notebook.thunks";
import { selectNotebookList, selectNotebookTags } from "../redux/notebook.selectors";
import { selectNotebooksLoaded } from "../../shared/redux/init.selectors";
import { useEntityFilterSort } from "../../shared/hooks/use-entity-filter-sort.hook";
import { showModal } from "modal/redux/modal.slice";
import { selectModalShowing } from "modal/redux/modal.selectors";

// components
import { FloatingCornerButton } from "shared/components/button/floating-corner-button.component";
import { NotebookList } from "../components/notebook-list.component";
import { SortFilterControls } from "../../shared/components/button/sort-filter-controls.component";
import { TagSidebar } from "tag/components/tag-sidebar.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SHeadingSubSubtitle, SHeadingSubtitle } from "shared/styles/typography.style";

export const NotebooksPage: React.FC = () => {
  const dispatch = useDispatch();
  const modalShowing = useSelector(selectModalShowing);
  const notebooksLoaded = useSelector(selectNotebooksLoaded);
  const notebooks = useSelector(selectNotebookList);
  const notebookTags = useSelector(selectNotebookTags);

  const { setIsUncategorized, isUncategorized, currentTag, setCurrentTag } = useTagFilter();

  const notebooksWithTag = useMemo(() => {
    if (isUncategorized) return notebooks.filter(notebook => notebook.tags.length === 0);
    if (!currentTag) return notebooks;
    return notebooks.filter(m => m.tags.includes(currentTag));
  }, [notebooks, isUncategorized, currentTag]);

  const {
    handleFilterTextChange,
    handleSortClick,
    getSortIconCaret,
    filterText,
    filteredEntities: filteredNotebooks,
    sortMode,
  } = useEntityFilterSort<INotebook>(notebooksWithTag, "name", "updated");

  useEffect(() => {
    if (!notebooksLoaded) {
      dispatch(getNotebooks());
    }
  }, [notebooksLoaded, dispatch]);

  function showCreateNotebookModal() {
    if (modalShowing) return;

    dispatch(
      showModal({ modalType: "create-notebook" })
    );
  }

  return (
    <SPage>
      <TagSidebar
        tags={notebookTags}
        currentTag={currentTag}
        isUncategorized={isUncategorized}
        setCurrentTag={setCurrentTag}
        setUncategorized={setIsUncategorized}
      />
      <SSection>
        <SPaddedContainer>
          <SHeadingSubtitle>Notebooks</SHeadingSubtitle>
          <SortFilterControls
            filterText={filterText}
            getIcon={getSortIconCaret}
            handleFilterTextChange={handleFilterTextChange}
            handleSortClick={handleSortClick}
            sortMode={sortMode}
            isCentered={false}
          />
          { filteredNotebooks.length === 0 && <SNotFoundHeading>No notebooks found.</SNotFoundHeading> }
        </SPaddedContainer>

        <NotebookList notebooks={filteredNotebooks} />
        <FloatingCornerButton
          icon="plus"
          handleClick={showCreateNotebookModal}
        />
      </SSection>
    </SPage>
  );
};

const SPage = styled.div`
  display: flex;
`;

const SSection = styled.section`
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
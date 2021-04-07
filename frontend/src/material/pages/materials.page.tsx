import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// logic
import { IMaterial } from "../redux/material.types";
import { useTagFilter } from "shared/hooks/use-tag-filter.hook";
import { getMaterials } from "../redux/material.thunks";
import { selectMaterialList, selectMaterialTags } from "../redux/material.selectors";
import { selectMaterialsLoaded } from "../../shared/redux/init.selectors";
import { useEntityFilterSort } from "../../shared/hooks/use-entity-filter-sort.hook";
import { showModal } from "modal/redux/modal.slice";
import { selectModalShowing } from "modal/redux/modal.selectors";

// components
import { FloatingCornerButton } from "shared/components/button/floating-corner-button.component";
import { MaterialList } from "../components/material-list.component";
import { SortFilterControls } from "../../shared/components/button/sort-filter-controls.component";
import { TagSidebar } from "tag/components/tag-sidebar.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SHeadingSubSubtitle, SHeadingSubtitle } from "shared/styles/typography.style";

export const MaterialsPage: React.FC = () => {
  const dispatch = useDispatch();
  const modalShowing = useSelector(selectModalShowing);
  const materialsLoaded = useSelector(selectMaterialsLoaded);
  const materials = useSelector(selectMaterialList);
  const materialTags = useSelector(selectMaterialTags);

  const { setIsUncategorized, isUncategorized, currentTag, setCurrentTag } = useTagFilter();

  function getMaterialsWithTag() {
    if (isUncategorized) return materials.filter(material => material.tags.length === 0);
    if (!currentTag) return materials;
    return materials.filter(m => m.tags.includes(currentTag));
  }

  const materialsWithTag = getMaterialsWithTag();

  const {
    handleFilterTextChange,
    handleSortClick,
    getSortIconCaret,
    filterText,
    filteredEntities: filteredMaterials,
    sortMode,
  } = useEntityFilterSort<IMaterial>(materialsWithTag, "name", "updated");

  useEffect(() => {
    if (!materialsLoaded) {
      dispatch(getMaterials());
    }
  }, [materialsLoaded, dispatch]);

  function showCreateMaterialModal() {
    if (modalShowing) return;

    dispatch(
      showModal({ modalType: "create-material" })
    );
  };

  return (
    <SPage>
      <TagSidebar
        tags={materialTags}
        currentTag={currentTag}
        isUncategorized={isUncategorized}
        setCurrentTag={setCurrentTag}
        setUncategorized={setIsUncategorized}
      />
      <SConceptSection>
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
          { filteredMaterials.length === 0 && <SNotFoundHeading>No notebooks found.</SNotFoundHeading> }
        </SPaddedContainer>

        <MaterialList materials={filteredMaterials} />
        <FloatingCornerButton
          icon="plus"
          handleClick={showCreateMaterialModal}
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
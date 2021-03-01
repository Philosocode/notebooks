import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// logic
import { IMaterial } from "../redux/material.types";
import { useTagFilter } from "shared/hooks/use-tag-filter.hook";
import { getMaterials } from "../redux/material.thunks";
import { selectMaterials, selectMaterialTags } from "../redux/material.selectors";
import { selectMaterialsLoaded } from "../../shared/redux/init.selectors";
import { useEntityFilterSort } from "../../shared/hooks/use-entity-filter-sort.hook";

// components
import { FloatingCornerButton } from "shared/components/button/floating-corner-button.component";
import { MaterialList } from "../components/material-list.component";
import { SortFilterControls } from "../../shared/components/button/sort-filter-controls.component";
import { TagSidebar } from "tag/components/tag-sidebar.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SHeadingSubSubtitle, SHeadingSubtitle } from "shared/styles/typography.style";

export const MaterialsPage = () => {
  const dispatch = useDispatch();
  const materialsLoaded = useSelector(selectMaterialsLoaded);
  const materials = useSelector(selectMaterials);
  const materialTags = useSelector(selectMaterialTags);

  const { setIsUncategorized, isUncategorized, currentTag, setCurrentTag } = useTagFilter();

  function getMaterialsWithTag() {
    if (isUncategorized) return materials.filter(c => c.tags.length === 0);
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
          <SHeadingSubtitle>Materials</SHeadingSubtitle>
          <SortFilterControls
            filterText={filterText}
            getIcon={getSortIconCaret}
            handleFilterTextChange={handleFilterTextChange}
            handleSortClick={handleSortClick}
            sortMode={sortMode}
            isCentered={false}
          />
          { filteredMaterials.length === 0 && <SNotFoundHeading>No materials found.</SNotFoundHeading> }
        </SPaddedContainer>

        <MaterialList materials={filteredMaterials} />
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
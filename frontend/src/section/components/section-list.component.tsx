import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropResult } from "react-beautiful-dnd";
import styled from "styled-components";

// logic
import { createSection, getSections, updateSectionPosition } from "section/redux/section.thunks";
import { selectCurrentMaterial, selectMaterialSections } from "material/redux/material.selectors";
import { repositionSection } from "material/redux/material.slice";

// components
import { DragAndDropWrapper } from "shared/components/drag-and-drop/drag-and-drop-wrapper.component";
import { SectionListItem } from "./section-list-item.component";
import { FloatingCornerButton } from "shared/components/button/floating-corner-button.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SHeadingSubSubtitle } from "shared/styles/typography.style";
import { useToggle } from "../../shared/hooks/use-toggle.hook";
import { CreateNamedEntityModal } from "../../shared/components/modal/create-named-entity-modal.component";

interface IProps {
  materialId: string;
}
export const SectionList: React.FC<IProps> = ({ materialId }) => {
  const dispatch = useDispatch();
  const currentMaterial = useSelector(selectCurrentMaterial);
  const materialSections = useSelector(selectMaterialSections);

  // modal states
  const [createModalShowing, toggleCreateModalShowing] = useToggle(false);

  useEffect(() => {
    if (currentMaterial && !currentMaterial.sectionIds) {
      dispatch(getSections(materialId));
    }
  }, [currentMaterial, dispatch, materialId]);

  function handleCreate(name: string) {
    dispatch(createSection({ name, materialId }));
  }

  function handleDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!destination || destination.index === source.index) return;

    const oldIndex = source.index;
    const newIndex = destination.index;

    dispatch(repositionSection({
      ownerEntityId: materialId,
      oldIndex,
      newIndex
    }));

    if (!materialSections) return;

    // async call to update position on backend
    dispatch(updateSectionPosition({
      materialId,
      sectionId: materialSections[oldIndex].id,
      // positions in DB start at 1, not 0
      newPosition: newIndex + 1,
    }));
  }

  if (materialSections === undefined) return null;
  return (
    <DragAndDropWrapper droppableId="section-list-droppable" handleDragEnd={handleDragEnd}>
      <SList>
        {materialSections.length === 0 && (
          <SHeadingSubSubtitle weight={500}>No notes found...</SHeadingSubSubtitle>
        )}
        {materialSections.map((section, index) => (
          <SectionListItem
            section={section}
            key={section.id}
            index={index}
            materialId={materialId}
          />
        ))}
      </SList>
      <FloatingCornerButton icon="plus" handleClick={toggleCreateModalShowing} />
      <CreateNamedEntityModal
        createEntity={handleCreate}
        entityName="Section"
        handleClose={toggleCreateModalShowing}
        isShowing={createModalShowing}
      />
    </DragAndDropWrapper>
  );
};

const SList = styled.ul`
  margin-top: ${theme.spacing.md};
`;
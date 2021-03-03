import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropResult } from "react-beautiful-dnd";
import styled from "styled-components";

// logic
import { createPart, getParts, updatePartPosition } from "part/redux/part.thunks";
import { selectCurrentMaterial, selectMaterialParts } from "material/redux/material.selectors";
import { repositionPart } from "material/redux/material.slice";

// components
import { DragAndDropWrapper } from "shared/components/drag-and-drop/drag-and-drop-wrapper.component";
import { PartListItem } from "./part-list-item.component";
import { FloatingCornerButton } from "shared/components/button/floating-corner-button.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SHeadingSubSubtitle } from "shared/styles/typography.style";
import { useToggle } from "../../shared/hooks/use-toggle.hook";
import { CreateNamedEntityModal } from "../../shared/components/modal/create-named-entity-modal.component";

interface IProps {
  materialId: string;
}
export const PartList: React.FC<IProps> = ({ materialId }) => {
  const dispatch = useDispatch();
  const currentMaterial = useSelector(selectCurrentMaterial);
  const materialParts = useSelector(selectMaterialParts);

  // modal states
  const [createModalShowing, toggleCreateModalShowing] = useToggle(false);

  useEffect(() => {
    if (currentMaterial && !currentMaterial.partIds) {
      dispatch(getParts(materialId));
    }
  }, [currentMaterial, dispatch, materialId]);

  function handleCreate(name: string) {
    dispatch(createPart({ name, materialId }));
  }

  function handleDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!destination || destination.index === source.index) return;

    const oldIndex = source.index;
    const newIndex = destination.index;

    dispatch(repositionPart({
      ownerEntityId: materialId,
      oldIndex,
      newIndex
    }));

    if (!materialParts) return;

    // async call to update position on backend
    dispatch(updatePartPosition({
      materialId,
      partId: materialParts[oldIndex].id,
      // positions in DB start at 1, not 0
      newPosition: newIndex + 1,
    }));
  }

  if (materialParts === undefined) return null;
  return (
    <DragAndDropWrapper droppableId="part-list-droppable" handleDragEnd={handleDragEnd}>
      <SList>
        {materialParts.length === 0 && (
          <SHeadingSubSubtitle weight={500}>No parts found...</SHeadingSubSubtitle>
        )}
        {materialParts.map((part, index) => (
          <PartListItem
            part={part}
            key={part.id}
            index={index}
            materialId={materialId}
          />

        ))}
      </SList>
      <FloatingCornerButton icon="plus" handleClick={toggleCreateModalShowing} />
      <CreateNamedEntityModal
        createEntity={handleCreate}
        entityName="Part"
        handleClose={toggleCreateModalShowing}
        isShowing={createModalShowing}
      />
    </DragAndDropWrapper>
  );
};

const SList = styled.ul`
  margin-top: ${theme.spacing.md};
`;
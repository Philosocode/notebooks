import React, { useEffect, useState } from "react";
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
import { CreateNamedEntityModal } from "../../shared/components/modal/create-named-entity-modal.component";
import { FloatingCornerButton } from "shared/components/button/floating-corner-button.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SHeadingSubSubtitle } from "shared/styles/typography.style";

interface IProps {
  materialId: string;
}
export const PartList: React.FC<IProps> = ({ materialId }) => {
  const [modalShowing, setModalShowing] = useState(false);
  const dispatch = useDispatch();
  const currentMaterial = useSelector(selectCurrentMaterial);
  const materialParts = useSelector(selectMaterialParts);

  useEffect(() => {
    if (currentMaterial && !currentMaterial.partIds) {
      dispatch(getParts(materialId));
    }
  }, [currentMaterial, dispatch, materialId]);

  function toggleModal() {
    setModalShowing(prevVal => !prevVal);
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

  function handleCreate(name: string) {
    dispatch(createPart({
      materialId,
      name,
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
          <PartListItem part={part} key={part.id} index={index} />
        ))}
      </SList>
      <FloatingCornerButton icon="plus" handleClick={toggleModal} />
      <CreateNamedEntityModal
        entityName="Part"
        createEntity={handleCreate}
        handleClose={toggleModal}
        modalShowing={modalShowing}
      />
    </DragAndDropWrapper>
  );
};

const SList = styled.ul`
  margin-top: ${theme.spacing.md};
`;
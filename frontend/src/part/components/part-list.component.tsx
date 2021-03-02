import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropResult } from "react-beautiful-dnd";
import styled from "styled-components";

import { getParts } from "part/redux/part.thunks";
import {
  selectCurrentMaterial,
  selectMaterialParts,
} from "material/redux/material.selectors";

import { PartListItem } from "./part-list-item.component";

import { theme } from "shared/styles/theme.style";
import { SHeadingSubSubtitle } from "shared/styles/typography.style";
import { DragAndDropWrapper } from "shared/components/drag-and-drop/drag-and-drop-wrapper.component";

interface IProps {
  materialId: string;
}
export const PartList: React.FC<IProps> = ({ materialId }) => {
  const dispatch = useDispatch();

  const currentMaterial = useSelector(selectCurrentMaterial);
  const materialParts = useSelector(selectMaterialParts);

  useEffect(() => {
    if (currentMaterial && !currentMaterial.partIds) {
      dispatch(getParts(materialId));
    }
  }, [currentMaterial, dispatch, materialId]);

  function handleDragEnd(result: DropResult) {
    console.log(result);
  }

  if (materialParts === undefined) return null;
  return (
    <DragAndDropWrapper droppableId="part-list-droppable" handleDragEnd={handleDragEnd}>
      <SList>
        {materialParts.length === 0 && (
          <SHeadingSubSubtitle weight={500}>
            No parts found...
          </SHeadingSubSubtitle>
        )}
        {materialParts.map((part, index) => (
          <PartListItem part={part} key={part.id} index={index} />
        ))}
      </SList>
    </DragAndDropWrapper>
  );
};

const SList = styled.ul`
  margin-top: ${theme.spacing.md};
`;
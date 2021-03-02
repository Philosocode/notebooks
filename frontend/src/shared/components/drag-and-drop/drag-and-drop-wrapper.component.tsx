import React from  "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";

interface IProps {
  droppableId: string;
  handleDragEnd: (result: DropResult) => void;
  children?: React.ReactNode;
}
export const DragAndDropWrapper: React.FC<IProps> = ({
  children,
  droppableId,
  handleDragEnd,
}) => {
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <SDroppableContainer
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {children}
          {provided.placeholder}
          </SDroppableContainer>
        )}
      </Droppable>
    </DragDropContext>
  )
}

const SDroppableContainer = styled.div`
  list-style-type: none;
  width: 100%;
`;

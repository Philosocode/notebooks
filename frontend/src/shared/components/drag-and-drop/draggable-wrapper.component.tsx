import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface IProps {
  children: React.ReactNode;
  draggableId: string;
  dragDisabled: boolean;
  index: number;
}
export const DraggableWrapper: React.FC<IProps> = ({
  children,
  draggableId,
  dragDisabled,
  index,
}) => {
  return (
    <Draggable draggableId={draggableId} index={index} isDragDisabled={dragDisabled}>
      {provided => (
        <div ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >{children}</div>
      )}
    </Draggable>
  );
};
import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

import { IPart } from "part/redux/part.types";
import { OptionIcon } from "shared/components/button/option-icon.component";

import { theme } from "shared/styles/theme.style";

interface IProps {
  index: number;
  part: IPart;
}
export const PartListItem: React.FC<IProps> = ({ index, part }) => {
  return (
    <Draggable draggableId={part.id} index={index}>
      {provided => (
        <SContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>
            <SHeadingId>{part.id}</SHeadingId>
            <SName>{part.name}</SName>
          </div>
          <OptionIcon handleClick={() => {}} />
        </SContainer>
      )}
    </Draggable>
  )
};

const SContainer = styled.li`
  background: ${theme.colors.offWhite};
  box-shadow: ${theme.boxShadows.light};
  display: flex;
    align-items: center;
    justify-content: space-between;
  margin-top: ${theme.spacing.base};
  padding: ${theme.spacing.base};
`;

const SHeadingId = styled.h4`
  color: ${theme.colors.gray[400]};
  font-size: ${theme.fontSizes.xs};
  font-weight: 400;
`;

const SName = styled.h3`
  font-size: ${theme.fontSizes.md};
`;
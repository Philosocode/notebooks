import React, { FC } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { theme } from "shared/styles/theme.style";

interface IProps {
  tag: string;
  color?: string;
  handleClick?: (event: React.MouseEvent) => void;
  handleDelete?: (tag: string) => void;
}
export const TagPill: FC<IProps> = ({ tag, handleDelete }) => {
  function handleDeleteClick(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (handleDelete) {
      handleDelete(tag);
    }
  }

  return (
    <SContainer>
      <STagText>{tag}</STagText>
      {handleDelete && ( // show delete icon only if delete handler is passed
        <SDeleteIcon icon="times-circle" onClick={(event) => handleDeleteClick(event)} />
      )}
    </SContainer>
  );
};

interface IContainerProps {
  color?: string;
}
const SContainer = styled.div<IContainerProps>`
  background: ${(props) => props.color ?? theme.colors.gray[100]};
  border-radius: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  margin-right: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};
  padding: 1rem 1.5rem;
  width: max-content;
  min-width: 7rem;
`;

const STagText = styled.span`
  font-size: ${theme.fontSizes.sm};
`;

const SDeleteIcon = styled(FontAwesomeIcon)`
  color: ${theme.colors.gray[700]};
  cursor: pointer;
  display: inline;
  font-size: 1.8rem;
  margin-left: ${theme.spacing.sm};
  margin-top: 0;
  transition: color ${theme.animations.transitionAppend};

  &:hover {
    color: ${theme.colors.gray[400]};
  }
`;

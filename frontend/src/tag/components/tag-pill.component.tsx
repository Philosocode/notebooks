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
  border-radius: 2em;
  display: flex;
    align-items: center;
    justify-content: center;
  font-size: ${theme.fontSizes.sm};
  margin-right: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};
  padding: 0.4em 0.8em;
  width: max-content;
  
  ${theme.media.tabPort} {
    font-size: ${theme.fontSizes.base};
    padding: 0.4em 1em;
  }
`;

const STagText = styled.span`
`;

const SDeleteIcon = styled(FontAwesomeIcon)`
  color: ${theme.colors.gray[700]};
  cursor: pointer;
  display: inline;
  font-size: 1.8rem;
  margin-left: ${theme.spacing.xs};
  margin-top: 0;
  transition: color ${theme.animations.transitionAppend};
  
  ${theme.media.tabPort} {
    margin-left: ${theme.spacing.sm};
  }

  &:hover {
    color: ${theme.colors.gray[400]};
  }
`;

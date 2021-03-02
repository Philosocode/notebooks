import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { theme } from "shared/styles/theme.style";

interface IProps {
  handleClick: (event: React.MouseEvent) => void;
}
export const OptionIcon: React.FC<IProps> = ({ handleClick }) => {
  return (
    <SIconContainer onClick={handleClick}>
      <SIcon icon="ellipsis-v" />
    </SIconContainer>
  );
}

const SIconContainer = styled.div`
  border-radius: 50%;
  cursor: pointer;
  display: flex;
    align-items: center;
    justify-content: center;
  font-size: 2.6rem;
  height: 1.5em; width: 1.5em;
  transition: background-color ${theme.animations.transitionAppend};

  &:hover {
    background-color: rgba(0,0,0,0.1);
  }
`;

const SIcon = styled(FontAwesomeIcon)``;
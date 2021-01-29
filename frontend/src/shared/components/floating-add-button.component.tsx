import React, { FC } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "shared/styles/theme.styles";

interface IProps {
  handleClick: () => void;
}
export const FloatingAddButton: FC<IProps> = ({ handleClick }) => {
  return (
    <SButton onClick={handleClick}>
      <SIcon icon="plus" />
    </SButton>
  )
};

const SButton = styled.button`
  border: 1px solid ${theme.colors.gray[500]};
  border-radius: 50%;
  cursor: pointer;
  height: 5rem;
  width: 5rem;
  position: fixed;
    bottom: 5vh;
    right: 2.5vw;

  &:focus,
  &:active {
    outline: 1px solid grey;
  }
`;

const SIcon = styled(FontAwesomeIcon)`
  font-size: 2rem;
`;
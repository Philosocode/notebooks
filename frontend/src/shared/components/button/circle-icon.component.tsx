import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styled from "styled-components";
import { theme } from "../../styles/theme.style";

interface IProps {
  children?: React.ReactNode;
  handleClick?: () => void;
  icon?: IconProp;
}
export const IconCircle: React.FC<IProps> = ({
  children,
  handleClick,
  icon
}) => {
  return (
    <SIconContainer onClick={handleClick} >
      { children }
      { icon && <SIcon icon={icon} /> }
    </SIconContainer>
  );
}

const SIcon = styled(FontAwesomeIcon)``;

const SIconContainer = styled.div`
  border-radius: 50%;
  cursor: pointer;
  display: flex;
    align-items: center;
    justify-content: center;
  height: 2.5em;
  width: 2.5em;
  position: relative;

  &:hover {
    background: ${theme.colors.gray[100]};
    color: ${theme.colors.green[300]};
  }
`;
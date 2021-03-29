import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styled from "styled-components";

import { theme } from "shared/styles/theme.style";

interface IProps {
  children?: React.ReactNode;
  className?: string;
  handleClick?: () => void;
  handleEventClick?: (event: React.MouseEvent) => void;
  icon?: IconProp;
}
export const CircleIcon: React.FC<IProps> = ({
  children,
  className,
  handleClick,
  handleEventClick,
  icon
}) => {
  function onClick(event: React.MouseEvent) {
    event.stopPropagation();
    event.preventDefault();

    handleClick?.();
    handleEventClick?.(event);
  }

  return (
    <SIconContainer className={className} onClick={onClick} >
      { children }
      { icon && <SIcon icon={icon} /> }
    </SIconContainer>
  );
}

const SIcon = styled(FontAwesomeIcon)`
  font-size: inherit;
`;

const SIconContainer = styled.div`
  border-radius: 50%;
  cursor: pointer;
  display: flex;
    align-items: center;
    justify-content: center;
  height: 2.2em;
  width: 2.2em;

  &:hover {
    background: ${theme.colors.gray[100]};
    color: ${theme.colors.green[300]};
  }
`;
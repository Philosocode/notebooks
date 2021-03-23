import React, { useCallback } from "react";
import { theme } from "shared/styles/theme.style";
import styled from "styled-components";

interface IProps {
  selectedTab: string;
  setSelectedTab: (name: string) => void;
  title: string;
}
export const TabTitle: React.FC<IProps> = ({
  selectedTab,
  setSelectedTab,
  title,
}) => {
  const isSelected = selectedTab === title;

  const handleClick = useCallback(() => {
    if (isSelected) return;

    setSelectedTab(title);
  }, [isSelected]); // eslint-disable-line

  return (
    <SLi>
      <STabButton
        onClick={handleClick}
        isSelected={isSelected}
      >{title}</STabButton>
    </SLi>
  );
};

const tabGreen = theme.colors.green[400];

const SLi = styled.li`
  display: block;
  margin-right: ${theme.spacing.base};
  
  ${theme.media.tabLand} {
    margin-right: ${theme.spacing.lg};
  }
  
  &:last-of-type {
     margin-right: 0;
  }
`;

interface ISTabButtonProps {
  isSelected: boolean;
}
const STabButton = styled.button<ISTabButtonProps>`
  border: none;
  border-bottom: 2px solid ${
    props => props.isSelected ? tabGreen : "transparent"
  };
  background: none;
  color: ${props => props.isSelected && tabGreen};
  cursor: pointer;
  padding: 0;
  font-weight: 500;
  
  ${theme.media.tabLand} {
    border-width: 3px;
    font-size: ${theme.fontSizes.md};
  }

  &:hover {
    color: ${tabGreen};
  }

  &:active,
  &:focus {
    outline: none;
  }
`;
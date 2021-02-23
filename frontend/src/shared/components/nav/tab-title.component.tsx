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
  }, [isSelected]);

  return (
    <li>
      <STabButton
        onClick={handleClick}
        isSelected={isSelected}
      >{title}</STabButton>
    </li>
  );
};

const tabGreen = theme.colors.green[400];

interface ISTabButtonProps {
  isSelected: boolean;
}
const STabButton = styled.button<ISTabButtonProps>`
  border: none;
  border-bottom: 3px solid ${
    props => props.isSelected ? tabGreen : "transparent"
  };
  background: none;
  color: ${props => props.isSelected && tabGreen};
  cursor: pointer;
  padding: 0;
  font-size: ${theme.fontSizes.md};
  margin-right: ${theme.spacing.lg};
  font-weight: 500;

  &:hover {
    color: ${tabGreen};
  }

  &:active,
  &:focus {
    outline: none;
  }
`;
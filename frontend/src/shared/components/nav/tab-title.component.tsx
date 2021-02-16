import React, { useCallback } from "react";
import { theme } from "shared/styles/theme.style";
import styled from "styled-components";

interface IProps {
  index: number;
  selectedTabIndex: number;
  setSelectedTab: (index: number) => void;
  title: string;
}
export const TabTitle: React.FC<IProps> = ({ index, selectedTabIndex, setSelectedTab, title }) => {
  const handleClick = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  const isSelected = index === selectedTabIndex;

  return (
    <li>
      <STabButton
        onClick={handleClick}
        isSelected={isSelected}
      >{title}</STabButton>
    </li>
  );
};

interface ISTabButtonProps {
  isSelected: boolean;
}
const STabButton = styled.button<ISTabButtonProps>`
  border: none;
  border-bottom: 3px solid ${
    props => props.isSelected ? theme.colors.green[500] : "transparent"
  };
  background: none;
  color: ${props => props.isSelected && theme.colors.green[500]};
  cursor: pointer;
  padding: 0;
  font-size: ${theme.fontSizes.md};
  margin-right: ${theme.spacing.lg};
  font-weight: 500;

  &:hover {
    color: ${theme.colors.green[500]};
  }

  &:active,
  &:focus {
    outline: none;
  }
`;
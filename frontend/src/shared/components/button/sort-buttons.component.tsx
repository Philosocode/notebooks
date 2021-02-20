import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

// logic
import { TSortMode } from "../../hooks/use-entity-filter-sort.hook";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

// styles
import { theme } from "../../styles/theme.style";

interface ISortButtonData {
  key: TSortMode;
  text: string;
}
const sortButtonData: ISortButtonData[] = [
  { key: "alphabetical", text: "A-Z" },
  { key: "created", text: "Created" },
  { key: "updated", text: "Updated" },
  { key: "custom", text: "Custom" },
];

interface IProps {
  getIcon: (mode: TSortMode) => IconProp;
  handleSortClick: (mode: TSortMode) => void;
  sortData?: typeof sortButtonData;
  sortMode: TSortMode;
}
export const SortButtons: React.FC<IProps> = ({
  getIcon,
  handleSortClick,
  sortData = sortButtonData,
  sortMode
}) => {
  return (
    <SSortButtons>
      {
        sortData?.map(data => (
          <SSortButton
            key={data.key}
            isSelected={sortMode === data.key}
            onClick={() => handleSortClick(data.key)}
          >
            {data.text} <SSortIcon icon={getIcon(data.key)} />
          </SSortButton>
        ))
      }
    </SSortButtons>
  )
}

const SSortIcon = styled(FontAwesomeIcon)`
  font-size: 1.8rem;
  margin-left: ${theme.spacing.xs};
`;

const SSortButtons = styled.div`
  margin-top: ${theme.spacing.sm};
`;

interface SSortButtonProps {
  isSelected: boolean;
}
const SSortButton = styled.button<SSortButtonProps>`
  background: ${props => props.isSelected && theme.colors.green[400]};
  color: ${props => props.isSelected && theme.colors.white};
  border: none;
  cursor: pointer;
  margin-left: ${theme.spacing.xs};
  margin-right: ${theme.spacing.xs};
  padding: ${theme.spacing.xs};
  font-weight: 500;
  width: 12rem;

  &:active,
  &:focus {
    outline: none;
  }
`;

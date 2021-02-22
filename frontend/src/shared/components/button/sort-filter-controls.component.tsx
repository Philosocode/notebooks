import React from "react";
import styled from "styled-components";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

// logic
import { TSortMode } from "../../hooks/use-entity-filter-sort.hook";

// styles
import { theme } from "../../styles/theme.style";
import { SInputBorderless } from "../../styles/form.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface ISortButtonData {
  key: TSortMode;
  text: string;
}
const sortButtonData: ISortButtonData[] = [
  { key: "alphabetical", text: "A-Z" },
  { key: "created", text: "Created" },
  { key: "updated", text: "Updated" },
];

const sortButtonDataWithCustom: ISortButtonData[] = [
  ...sortButtonData,
  { key: "custom", text: "Custom" }
];

interface IProps {
  filterText: string;
  getIcon: (mode: TSortMode) => IconProp;
  handleFilterTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortClick: (mode: TSortMode) => void;
  sortMode: TSortMode;
  isCentered?: boolean;
  includeCustom?: boolean;
}
export const SortFilterControls: React.FC<IProps> = ({
  filterText,
  getIcon,
  handleFilterTextChange,
  handleSortClick,
  sortMode,
  isCentered = false,
  includeCustom,
}) => {
  const sortData = includeCustom
    ? sortButtonDataWithCustom
    : sortButtonData;

  return (
    <SControls isCentered={isCentered}>
      <SInput
        placeholder="Filter Items"
        onChange={handleFilterTextChange}
        value={filterText}
      />

      <SSortButtons>
        {
          sortData.map(data => (
            <SSortButton
              key={data.key}
              isSelected={sortMode === data.key}
              onClick={() => handleSortClick(data.key)}
            >
              {data.text}
              { data.key !== "custom" && <SSortIcon icon={getIcon(data.key)} /> }
            </SSortButton>
          ))
        }
      </SSortButtons>
    </SControls>
  );
}

interface IControlProps {
  isCentered: boolean;
}
const SControls = styled.div<IControlProps>`
  display: flex;
    flex-direction: column;
    align-items: ${props => props.isCentered ? "center" : "flex-start" };
  margin-top: ${theme.spacing.base};
  width: 100%;
`;

const SInput = styled(SInputBorderless)`
  margin-top: ${theme.spacing.base};
  max-width: 40rem;
`;

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
  margin-right: ${theme.spacing.xs};
  padding: ${theme.spacing.xs};
  font-weight: 500;
  width: 12rem;

  &:active,
  &:focus {
    outline: none;
  }
`;

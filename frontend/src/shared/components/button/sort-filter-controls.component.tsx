import React from "react";
import { SortButtons } from "./sort-buttons.component";
import styled from "styled-components";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

// logic
import { TSortMode } from "../../hooks/use-entity-filter-sort.hook";

// styles
import { theme } from "../../styles/theme.style";
import { SInputBorderless } from "../../styles/form.style";

interface IProps {
  filterText: string;
  getIcon: (mode: TSortMode) => IconProp;
  handleFilterTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortClick: (mode: TSortMode) => void;
  sortMode: TSortMode;
}
export const SortFilterControls: React.FC<IProps> = ({
  filterText,
  getIcon,
  handleFilterTextChange,
  handleSortClick,
  sortMode,
}) => {
  return (
    <SControls>
      <SInput
        placeholder="Filter by hook title..."
        onChange={handleFilterTextChange}
        value={filterText}
      />
      <SortButtons
        getIcon={getIcon}
        handleSortClick={handleSortClick}
        sortMode={sortMode}
      />
    </SControls>
  );
}

const SControls = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${theme.spacing.base};
  width: 100%;
`;

const SInput = styled(SInputBorderless)`
  margin-top: ${theme.spacing.base};
  max-width: 40rem;
`;

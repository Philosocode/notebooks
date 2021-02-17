import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

// styles
import { theme } from "../../shared/styles/theme.style";
import { SInputBorderless } from "shared/styles/form.style";
import { SHeadingSubSubtitle } from "shared/styles/typography.style";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  handleSelect: (hook: string) => void;
  hooks: string[];
}
export const HookSelectGrid: React.FC<IProps> = ({ handleSelect, hooks }) => {
  const [filterText, setFilterText] = useState("");

  function getFilteredHooks() {
    if (filterText.trim() === "") return hooks;

    const filterTrimLower = filterText.trim().toLowerCase();

    return hooks.filter((hook) =>
      hook.toLowerCase().includes(filterTrimLower.toLowerCase())
    );
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFilterText(event.target.value);
  }

  return (
    <div>
      <SInput onChange={handleInputChange} />
      <SHookGrid>
        { getFilteredHooks().length === 0 && (
          <SHeadingSubSubtitle style={{ fontWeight: 500 }}>No hooks found.</SHeadingSubSubtitle>
        )}
        {getFilteredHooks().map((hook) => (
          <SHookCard
            key={hook}
            onClick={() => handleSelect(hook)}
          >
            {hook}
            <SHookCardIcon icon={faCheck} />
          </SHookCard>
        ))}
      </SHookGrid>
    </div>
  );
};

const SInput = styled(SInputBorderless)`
  max-width: 40rem;
  margin-top: ${theme.spacing.base};
`;

const SHookGrid = styled.div`
  display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    justify-items: space-between;
    gap: ${theme.spacing.base};
  margin-top: ${theme.spacing.base};
`;

const SHookCard = styled.div`
  background: ${theme.colors.gray[100]};
  border-radius: 5px;
  box-shadow: ${theme.boxShadows.light};
  color: ${theme.colors.gray[600]};
  cursor: pointer;
  font-weight: 500;
  padding: ${theme.spacing.sm};
  position: relative;

  &:hover {
    background: ${theme.colors.green[400]};
    color: ${theme.colors.white};
  }
`;

const SHookCardIcon = styled(FontAwesomeIcon)`
  position: absolute;
    bottom: 5px;
    right: 5px;
`;

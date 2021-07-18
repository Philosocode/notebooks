import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

// logic
import { selectConceptHooks } from "concept/redux/concept.selectors";

// styles
import { theme } from "../../shared/styles/theme.style";
import { SInputBorderless } from "shared/styles/form.style";
import {
  SHeadingSubSubtitle,
  SRegularText,
} from "shared/styles/typography.style";

interface IProps {
  defaultHooks: string[];
  handleSelect: (hook: string) => void;
}
export const HookSelectGrid: React.FC<IProps> = ({
  handleSelect,
  defaultHooks,
}) => {
  const [filterText, setFilterText] = useState("");
  const conceptHooks = useSelector(selectConceptHooks);

  function getFilteredHooks() {
    if (filterText.trim() === "") return defaultHooks;

    const filterTrimLower = filterText.trim().toLowerCase();

    return defaultHooks.filter((hook) =>
      hook.toLowerCase().includes(filterTrimLower.toLowerCase())
    );
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFilterText(event.target.value);
  }

  function conceptHasHook(hook: string) {
    return conceptHooks?.some(
      (conceptHook) =>
        conceptHook.name.toLowerCase() === hook.trim().toLowerCase()
    );
  }

  return (
    <div>
      <SInput onChange={handleInputChange} placeholder="Type to filter hooks" />
      <SHookGrid>
        {getFilteredHooks().length === 0 && (
          <SHeadingSubSubtitle style={{ fontWeight: 500 }}>
            No hooks found.
          </SHeadingSubSubtitle>
        )}
        {getFilteredHooks().map((hook) => (
          <SHookCard key={hook} onClick={() => handleSelect(hook)}>
            <SRegularText weight={500}>{hook}</SRegularText>
            {conceptHasHook(hook) && <SHookCardIcon icon={faCheck} />}
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
  margin-top: ${theme.spacing.base};

  ${theme.media.tabPort} {
    margin-top: ${theme.spacing.sm};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
    justify-items: space-between;
    gap: ${theme.spacing.base};
  }
`;

const SHookCard = styled.div`
  background: ${theme.colors.gray[100]};
  border-radius: 5px;
  box-shadow: ${theme.boxShadows.light};
  color: ${theme.colors.gray[600]};
  cursor: pointer;
  font-weight: 500;
  margin-top: ${theme.spacing.base};
  padding: ${theme.spacing.sm};
  position: relative;

  &:hover {
    background: ${theme.colors.green[400]};
    color: ${theme.colors.white};
  }
`;

const SHookCardIcon = styled(FontAwesomeIcon)`
  position: absolute;
  bottom: 7px;
  right: 7px;
`;

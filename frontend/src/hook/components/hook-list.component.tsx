import React, { useCallback, useState } from "react";
import styled from "styled-components";

// logic
import { IHook } from "hook/redux/hook.types";

// styles
import { theme } from "../../shared/styles/theme.style";
import { HookListItem } from "./hook-list-item.component";
import { SHeadingSubSubtitle } from "shared/styles/typography.style";

interface IExpandedHooks {
  [key: string]: boolean;
}
interface IProps {
  hooks: IHook[];
}
export const HookList: React.FC<IProps> = ({ hooks }) => {
  const [expandedHooks, setExpandedHooks] = useState<IExpandedHooks>(initExpandedHooks());

  function initExpandedHooks() {
    const hash: IExpandedHooks = {};

    hooks.forEach(hook => hash[hook.id] = true);

    return hash;
  }

  function toggleExpandedHook(hookId: string) {
    const updatedValue = !expandedHooks[hookId];

    setExpandedHooks(prevState => ({ ...prevState, [hookId]: updatedValue }));
  }

  return (
    <SContainer>
      <SHeadingSubSubtitle># Hooks: {hooks.length}</SHeadingSubSubtitle>

      <SHookList>
        {hooks.map((hook) => (
          <HookListItem
            key={hook.id}
            hook={hook}
            isExpanded={expandedHooks[hook.id]}
            toggleIsExpanded={toggleExpandedHook}
          />
        ))}
      </SHookList>
    </SContainer>
  );
};

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SHookList = styled.ul`
  box-shadow: ${theme.boxShadows.light};
  margin-top: ${theme.spacing.md};
  width: 100%;
  max-width: 80rem;
`;
import React from "react";
import styled from "styled-components";

// logic
import { IHook } from "hook/redux/hook.types";

// styles
import { HookListItem } from "./hook-list-item.component";
import { SHeadingSubSubtitle } from "shared/styles/typography.style";

interface IProps {
  hooks: IHook[];
}
export const HookList: React.FC<IProps> = ({ hooks }) => {
  return (
    <SContainer>
      <SHeadingSubSubtitle># Hooks: {hooks.length}</SHeadingSubSubtitle>
      <SHookList>
        {hooks.map((hook) => (
          <HookListItem key={hook.id} hook={hook} />
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
  width: 100%;
  max-width: 80rem;
`;
import React from "react";
import styled from "styled-components";

// logic
import { THookType } from "hook/redux/hook.types";
import { convertToTitleCase } from "shared/utils/string.util";
import { allHooksHash } from "hook/data/hooks.data";

// components
import { HookSelectGrid } from "./hook-select-grid.component";

// styles
import { SHeadingSubtitle } from "shared/styles/typography.style";
import { theme } from "../../shared/styles/theme.style";

interface IProps {
  handleSelectHook: (hook: string) => void;
  hookType: THookType;
}
export const HookSelect: React.FC<IProps> = ({ handleSelectHook, hookType }) => {
  return (
    <>
      <SHeading>
        Select Hook: {hookType && convertToTitleCase(hookType)}
      </SHeading>
      <HookSelectGrid
        defaultHooks={allHooksHash[hookType]}
        handleSelect={handleSelectHook}
      />
    </>
  );
};

const SHeading = styled(SHeadingSubtitle)`
  margin-top: ${theme.spacing.base};
`;
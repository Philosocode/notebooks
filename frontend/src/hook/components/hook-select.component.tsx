import React from "react";

// logic
import { convertToTitleCase } from "shared/utils/string.util";
import { allHooksHash } from "hook/data/hooks.data";

// components
import { HookSelectGrid } from "./hook-select-grid.component";

// styles
import { SHeadingSubtitle } from "shared/styles/typography.style";
import { THookType } from "hook/hook.types";

interface IProps {
  handleSelectHook: (hook: string) => void;
  hookType: THookType;
}
export const HookSelect: React.FC<IProps> = ({ handleSelectHook, hookType }) => {
  return (
    <>
      <SHeadingSubtitle>
        Select Hook: {hookType && convertToTitleCase(hookType)}
      </SHeadingSubtitle>
      <HookSelectGrid
        handleSelect={handleSelectHook}
        hooks={allHooksHash[hookType]}
      />
    </>
  );
};

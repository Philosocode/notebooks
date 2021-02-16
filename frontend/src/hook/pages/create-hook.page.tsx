import React, { useState } from "react";

// logic
import { THookType } from "hook/hook.types";

// components
import { HookTypes } from "hook/components/hook-types.component";

// styles
import { SDetailPageContent } from "shared/styles/layout.style";
import { SHeadingSubtitle } from "shared/styles/typography.style";

export const CreateHookPage: React.FC = () => {
  const [selectedHookType, setSelectedHookType] = useState<THookType>();

  return (
    <SDetailPageContent>
      <SHeadingSubtitle>Hook Create</SHeadingSubtitle>
      <HookTypes
        handleSelectHookType={setSelectedHookType}
        selectedHookType={selectedHookType}
      />
    </SDetailPageContent>
  );
};


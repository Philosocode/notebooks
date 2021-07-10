import React from "react";

// components
import { ConsumeWorkflow } from "workflow/components/consume/consume-workflow.component";

// styles
import { SPageContentCenter } from "shared/styles/layout.style";
import { SHeadingSubtitle } from "shared/styles/typography.style";

export const WorkflowsPage: React.FC = () => {
  return (
    <SPageContentCenter>
      <SHeadingSubtitle>Workflow: Reading / Watching</SHeadingSubtitle>
      <ConsumeWorkflow />
    </SPageContentCenter>
  );
};
import React from "react";

// components
import { ConsumeWorkflow } from "workflow/components/consume/consume-workflow.component";

// styles
import { SPageContentCenter } from "shared/styles/layout.style";

export const WorkflowsPage: React.FC = () => {
  return (
    <SPageContentCenter>
      <ConsumeWorkflow />
    </SPageContentCenter>
  );
};

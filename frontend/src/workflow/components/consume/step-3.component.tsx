import React, { useState } from "react";
import { MarkdownEditor } from "shared/mde/markdown-editor.component";
import { SRegularText } from "shared/styles/typography.style";

import { SButton, SWorkflowHeading } from "../../styles/workflow.style";

interface IProps {
  handleReset: () => void;
}

export const StepThree: React.FC<IProps> = ({ handleReset }) => {
  const [summaryText, setSummaryText] = useState("");

  const buttonDisabled = summaryText.trim() === "";

  return (
    <div>
      <SWorkflowHeading>Session Summary</SWorkflowHeading>
      <SRegularText>
        Summarize what you learned during the entire study session.
      </SRegularText>
      <MarkdownEditor
        value={summaryText}
        setValue={setSummaryText}
        placeholder="Enter summary of what you've learned..."
        initialTab="write"
        imagesAreTemporary
      />
      <SButton disabled={buttonDisabled} onClick={handleReset}>Restart</SButton>
    </div>
  );
};
import React from "react";

import { useStep } from "shared/hooks/use-step.hook";
import { SHeadingSubtitle } from "shared/styles/typography.style";

import { StepOne } from "./step-1.component";
import { StepTwo } from "./step-2.component";
import { StepThree } from "./step-3.component";

// TODO: refactor
export const ConsumeWorkflow: React.FC = () => {
  const { step, setStep, increment } = useStep(1, 3);

  return (
    <div>
      <SHeadingSubtitle>Workflow: Reading / Watching</SHeadingSubtitle>
      { step === 1 && <StepOne handleNext={increment} /> }
      { step === 2 && <StepTwo handleNext={increment} /> }
      { step === 3 && <StepThree handleReset={() => setStep(1)} /> }
    </div>
  );
};
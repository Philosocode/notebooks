import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { LabelCheckbox } from "shared/components/form/label-checkbox.component";
import { useStep } from "shared/hooks/use-step.hook";
import { useToggle } from "shared/hooks/use-toggle.hook";
import { MarkdownEditor } from "shared/mde/markdown-editor.component";
import { selectTimerState } from "timer/redux/timer.selectors";
import { SButton, SWorkflowHeading } from "../../styles/workflow.style";

interface ICheckboxHash {
  [key: string]: boolean;
}

const mindsetItems = [
  "Read / watch slowly and deeply. Don't rush",
  "Regularly stop and think about the material. Ask yourself questions",
  "You can only view this material one time. Once you're done, you can't go back",
];

const preStudyItems = [
  "Skim through the material. Pay attention to headings, images, & questions",
  "If available: read / watch the summary",
  "If new material: find and attempt the practice problems",
];

const initialMindsetState = mindsetItems.reduce<ICheckboxHash>(
  (acc, _, index) => {
    const stepNumber = "mindset" + (index + 1);
    acc[stepNumber] = false;

    return acc;
  },
  {}
);

const initialPreStudyState = preStudyItems.reduce<ICheckboxHash>(
  (acc, _, index) => {
    const stepNumber = "pre-study" + (index + 1);
    acc[stepNumber] = false;

    return acc;
  },
  {}
);

interface IProps {
  handleNext: () => void;
}

const maxStep = 4;

export const StepOne: React.FC<IProps> = ({ handleNext }) => {
  const [summaryText, setSummaryText] = useState("");
  const { step, increment } = useStep(1, 4);
  const [values, setValues] = useState({
    ...initialMindsetState,
    ...initialPreStudyState,
  });
  const [timerSet, toggleTimerSet] = useToggle(false);
  
  const { runningState } = useSelector(selectTimerState);

  useEffect(() => {
    if (step === maxStep) return;

    const numChecks = Object.values(values).filter((val) => val === true).length;

    if (
      (step === 1 && numChecks >= 3) ||
      (step === 2 && timerSet) ||
      (step === 3 && numChecks >= 6)) {
      increment();
    }
  }, [values, step, increment, timerSet]);

  useEffect(() => {
    if (timerSet) return;

    if (runningState === "running") {
      toggleTimerSet();
    }
  });

  // disable if there's an unchecked checkbox or summary text empty
  const formDisabled =
    Object.values(values).includes(false) || summaryText.trim() === "";

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValues((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.checked,
      };
    });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (formDisabled) return;

    handleNext();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <SWorkflowHeading>Mindset</SWorkflowHeading>
        {mindsetItems.map((item, index) => {
          const stepName = "mindset" + (index + 1);

          return (
            <LabelCheckbox
              key={stepName}
              htmlFor={stepName}
              text={item}
              id={stepName}
              name={stepName}
              onChange={handleCheckboxChange}
              checked={values.timerSet}
            />
          );
        })}

        {step >= 2 && (
          <>
            <SWorkflowHeading>Start Timer</SWorkflowHeading>
            <LabelCheckbox
              key="timerSet"
              htmlFor="timerSet"
              text="Start the study timer (click on 'Timer' in the left sidebar)"
              id="timerSet"
              name="timerSet"
              checked={timerSet}
            />
          </>
        )}

        {step >= 3 && (
          <>
            <SWorkflowHeading>Pre-Study</SWorkflowHeading>
            {preStudyItems.map((item, index) => {
              const stepName = "pre-study" + (index + 1);

              return (
                <LabelCheckbox
                  key={stepName}
                  htmlFor={stepName}
                  text={item}
                  id={stepName}
                  name={stepName}
                  onChange={handleCheckboxChange}
                  checked={values[stepName]}
                />
              );
            })}
          </>
        )}

        {step >= 4 && (
          <>
            <MarkdownEditor
              value={summaryText}
              setValue={setSummaryText}
              placeholder="Summarize what you've learned so far..."
              initialTab="write"
              imagesAreTemporary
            />

            <SButton disabled={formDisabled}>Next</SButton>
          </>
        )}
      </form>
    </div>
  );
};

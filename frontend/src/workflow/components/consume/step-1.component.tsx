import React, { useState } from "react";

import { LabelCheckbox } from "shared/components/form/label-checkbox.component";
import { MarkdownEditor } from "shared/mde/markdown-editor.component";
import { SButton, SWorkflowHeading } from "../../styles/workflow.style";

interface ICheckboxHash {
  [key: string]: boolean;
}

const mindsetItems = [
  "Read / watch slowly and deeply. Don't rush",
  "Regularly stop and think about the material. Ask yourself questions",
  "I get only 1 chance to read / watch this. Once I'm done, I can't go back",
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

export const StepOne: React.FC<IProps> = ({ handleNext }) => {
  const [summaryText, setSummaryText] = useState("");
  const [values, setValues] = useState({
    ...initialMindsetState,
    ...initialPreStudyState,
  });

  // disable if there's an unchecked checkbox or summary text empty
  const formDisabled = Object.values(values).includes(false) || summaryText.trim() === "";

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
              checked={values[stepName]}
            />
          );
        })}

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

        <MarkdownEditor
          value={summaryText}
          setValue={setSummaryText}
          placeholder="Summarize what you've learned so far..."
          initialTab="write"
          imagesAreTemporary
        />

        <SButton disabled={formDisabled}>Next</SButton>
      </form>
    </div>
  );
};

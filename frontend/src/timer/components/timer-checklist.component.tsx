import React from "react";
import styled from "styled-components";

import { useForm } from "../../shared/hooks/use-form.hook";
import { LabelCheckbox } from "shared/components/form/label-checkbox.component";
import { theme } from "shared/styles/theme.style";

// variables
const checkboxItems = [
  "Relax. Don't think about what you just studied",
  "Let your subconscious mind process what you just learned",
  "Get up and move around. Get some water or food",
  "Go for a walk. Do some exercise. Take a shower",
];

interface ICheckboxHash {
  [key: string]: boolean;
}
const checkboxHash = checkboxItems.reduce<ICheckboxHash>(
  (acc, _, index) => {
    const stepNumber = "step" + (index + 1);
    acc[stepNumber] = false;

    return acc;
  }, {}
);

export const TimerChecklist: React.FC = () => {
  const { values, handleChange } = useForm(checkboxHash);

  return (
    <SBreakList>
      {
        checkboxItems.map((_, index) => {
          const stepName = "step" + (index + 1);

          return (
            <LabelCheckbox
              key={stepName}
              htmlFor={stepName}
              text={checkboxItems[index]}
              id={stepName}
              name={stepName}
              onChange={handleChange}
              checked={values[stepName]}
            />
          );
        })
      }
    </SBreakList>
  )
}

const SBreakList = styled.ul`
  font-size: ${theme.fontSizes.basePlus};
  list-style-type: disc;
  padding: ${theme.spacing.base};
  padding-top: 0;
`;

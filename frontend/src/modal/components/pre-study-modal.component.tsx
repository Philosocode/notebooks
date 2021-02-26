import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectWelcomeScreenShown } from "shared/redux/init.selectors";
import { setWelcomeScreenShown } from "shared/redux/init.slice";
import { ModalWrapper } from "./modal-wrapper.component";

import { SHeadingSubtitle } from "shared/styles/typography.style";
import styled from "styled-components";
import { theme } from "../../shared/styles/theme.style";
import { SButtonGreen } from "../../shared/styles/button.style";

const formItems = [
  "Find a quiet, distraction-free place to study",
  "Remove distractions. Don't multitask",
  "Take regular breaks (every 30-60 minutes)",
];

interface IFormState {
  [key: string]: boolean;
}

const initialFormState = formItems.reduce<IFormState>(
  (acc, _2, index) => {
    const stepNumber = "step" + (index + 1);
    acc[stepNumber] = false;

    return acc;
  },
  {});

export const PreStudyModal: React.FC = () => {
  const welcomeScreenShown = useSelector(selectWelcomeScreenShown);
  const dispatch = useDispatch();

  const [values, setValues] = useState(initialFormState);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValues(prevState => {
      return {
        ...prevState,
        [event.target.name]: event.target.checked
      };
    });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    handleClose();
  }

  function handleClose() {
    dispatch(setWelcomeScreenShown(true));
  }

  const submitDisabled = Object.values(values).includes(false);

  return (
    <ModalWrapper
      handleClose={handleClose}
      isShowing={!welcomeScreenShown}
      disableDefaultClose={true}
    >
      <SHeadingSubtitle>Pre-Study Checklist</SHeadingSubtitle>
      <form onSubmit={handleSubmit}>
        {
          formItems.map((item, index) => {
            const stepName = "step" + (index + 1);

            return (
              <SLabel key={stepName} htmlFor={stepName}>{formItems[index]}
                <input
                  type="checkbox"
                  id={stepName}
                  name={stepName}
                  onChange={handleChange}
                  checked={values[stepName]}
                />
                <span />
              </SLabel>
            );
          })
        }
        <SButton disabled={submitDisabled}>Close</SButton>
      </form>
    </ModalWrapper>
  );
};

// FROM: https://www.w3schools.com/howto/howto_css_custom_checkbox.asp
const SLabel = styled.label`
  cursor: pointer;
  display: block;
  font-size: ${theme.fontSizes.basePlus};
  margin-top: ${theme.spacing.sm};
  padding-left: calc(${theme.spacing.base} + ${theme.spacing.sm});
  position: relative;
  width: max-content;

  // hide the checkbox input
  & > input {
    display: none;
  }

  // custom checkbox
  & > span {
    border: 1px solid ${theme.colors.gray[500]};
    border-radius: 3px;
    height: 2.5rem;
    width: 2.5rem;
    position: absolute;
    top: 0;
    left: 0;
  }

  // add background when checked
  & > input:checked ~ span {
    background: ${theme.colors.green[400]};
    border: 1px solid ${theme.colors.green[400]};
  }

  // create checkmark (hidden when unchecked)
  & > span:after {
    color: ${theme.colors.offWhite};
    content: "✓";
    display: none;
    font-weight: 500;
    text-align: center;
    transform: translateY(-2px);
  }
  
  // show checkmark when checked
  & > input:checked ~ span:after {
    display: block;
  }
`;

const SButton = styled(SButtonGreen)`
  margin-top: ${theme.spacing.base};
`;
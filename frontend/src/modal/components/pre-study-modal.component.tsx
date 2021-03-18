import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// logic
import { IUserSettings } from "../../user/redux/user.types";
import { selectWelcomeScreenShown } from "shared/redux/init.selectors";
import { setWelcomeScreenShown } from "shared/redux/init.slice";

// components
import { ModalWrapper } from "./modal-wrapper.component";
import { LabelCheckbox } from "../../shared/components/form/label-checkbox.component";

// styles
import { SHeadingSubtitle } from "shared/styles/typography.style";
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

interface IProps {
  settings: IUserSettings;
}
export const PreStudyModal: React.FC<IProps> = ({ settings }) => {
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
  const shouldShow = !welcomeScreenShown && settings.showWelcomeModal;
  return (
    <ModalWrapper
      handleClose={handleClose}
      isShowing={shouldShow}
      disableDefaultClose={true}
    >
      <SHeadingSubtitle>Pre-Study Checklist</SHeadingSubtitle>
      <form onSubmit={handleSubmit}>
        {
          formItems.map((item, index) => {
            const stepName = "step" + (index + 1);

            return (
              <LabelCheckbox
                key={stepName}
                htmlFor={stepName}
                text={formItems[index]}
                id={stepName}
                name={stepName}
                onChange={handleChange}
                checked={values[stepName]}
              />
            );
          })
        }
        <SButton disabled={submitDisabled}>Close</SButton>
      </form>
    </ModalWrapper>
  );
};

const SButton = styled(SButtonGreen)`
  margin-top: ${theme.spacing.base};
`;
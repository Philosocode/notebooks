import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectWelcomeScreenShown } from "shared/redux/init.selectors";
import { setWelcomeScreenShown } from "shared/redux/init.slice";
import { ModalWrapper } from "./modal-wrapper.component";

import { SHeadingSubtitle } from "shared/styles/typography.style";
import styled from "styled-components";
import { theme } from "../../shared/styles/theme.style";

export const WelcomeModal: React.FC = () => {
  const welcomeScreenShown = useSelector(selectWelcomeScreenShown);
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(setWelcomeScreenShown(true));
  }

  return (
    <ModalWrapper handleClose={handleClose} isShowing={!welcomeScreenShown}>
      <SHeadingSubtitle>Pre-Study Checklist</SHeadingSubtitle>
      <form>
        <SLabel htmlFor="step1">
          Find a quiet, distraction-free place to study
          <input type="checkbox" id="step1" name="step1" />
          <span />
        </SLabel>
        <SLabel htmlFor="step2">
          Remove distractions. Don't multitask.
          <input type="checkbox" id="step2" name="step2" />
          <span />
        </SLabel>
        <SLabel htmlFor="step3">
          Take regular breaks (every 30-60 minutes).
          <input type="checkbox" id="step3" name="step3" />
          <span />
        </SLabel>
      </form>
    </ModalWrapper>
  );
}

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

  /* Create the checkmark/indicator (hidden when not checked) */
  & > span:after {
    color: ${theme.colors.offWhite};
    content: "✓";
    display: none;
    font-weight: 500;
    text-align: center;
    transform: translateY(-2px);
  }

  /* Show the checkmark when checked */
  & > input:checked ~ span:after {
    display: block;
  }
`;
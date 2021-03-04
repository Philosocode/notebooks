import styled from "styled-components";

import { theme } from "./theme.style";

export const SInputBorderless = styled.input`
  border: none;
  border-bottom: 1px solid ${theme.colors.gray[500]};
  display: block;
  padding-bottom: ${theme.spacing.xs};
  width: 100%;

  &:active,
  &:focus {
    outline: none;
  }
`;

export const SCheckboxLabel = styled.label`
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
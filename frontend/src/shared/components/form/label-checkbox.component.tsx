import React, { ChangeEvent } from "react";
import styled from "styled-components";

import { theme } from "../../styles/theme.style";

interface IProps {
  htmlFor: string;
  text: string;
  id: string;
  name: string;
  onChange: (event: ChangeEvent) => void;
  checked: boolean;
}
export const LabelCheckbox: React.FC<IProps> = ({
  htmlFor,
  text,
  id,
  name,
  onChange,
  checked,
}) => {
  return (
    <SLabel htmlFor={htmlFor}>{text}
      <input
        type="checkbox"
        id={id}
        name={name}
        onChange={onChange}
        checked={checked}
      />
      <span />
    </SLabel>
  )
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

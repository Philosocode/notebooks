import React, { InputHTMLAttributes } from "react";

import { SCheckboxLabel } from "shared/styles/form.style";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
  htmlFor: string;
}
export const LabelCheckbox: React.FC<IProps> = ({
  children,
  htmlFor,
  text,
  ...props
}) => {
  return (
    <SCheckboxLabel htmlFor={htmlFor}>{text}
      <input
        type="checkbox"
        {...props}
      />
      <span />
    </SCheckboxLabel>
  )
};
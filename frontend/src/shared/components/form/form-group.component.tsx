import React, { FC, InputHTMLAttributes } from "react";
import styled from "styled-components";

import { SInputBorderless } from "shared/styles/form.style";

interface IProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  name: string;
  type: "email" | "password" | "text" | "textarea";
}
export const FormGroup: FC<IProps> = ({ name, type, ...rest }) => {
  function renderInput() {
    return (
      <SInputBorderless type={type} id={name} name={name} required {...rest} />
    );
  }

  function renderTextArea() {
    return <textarea id={name} name={name} required {...rest} />;
  }

  return (
    <div>
      {type === "textarea" ? renderTextArea() : renderInput()}
      <SLabel htmlFor={name}>{name}</SLabel>
    </div>
  );
};

const SLabel = styled.label`
  position: absolute;
  transform: translateX(-9999rem);
`;

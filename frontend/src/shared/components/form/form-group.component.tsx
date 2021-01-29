import React, { FC, InputHTMLAttributes } from "react";
import { theme } from "shared/styles/theme.styles";
import styled from "styled-components";

interface IProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  name: string;
  type: "email" | "password" | "text" | "textarea";
}
export const FormGroup: FC<IProps> = ({
  name, 
  type, 
  ...rest
}) => {
  function renderInput() {
    return (
      <SInput
        type={type}
        id={name}
        name={name}
        required
        {...rest}
      />
    );
  }

  function renderTextArea() {
    return (
      <textarea
        id={name}
        name={name}
        required
        {...rest}
      />
    )
  }

  return (
    <div>
      {
        type === "textarea"
          ? renderTextArea()
          : renderInput()
      }
      <SLabel htmlFor={name}>{name}</SLabel>
    </div>
  )
 }

 const SInput = styled.input`
  border: none;
  border-bottom: 1px solid ${theme.colors.gray[500]};
  display: block;
  padding-bottom: ${theme.spacing.xs};
  width: 90%;
  max-width: 35rem;

  &:active,
  &:focus {
    outline: none;
  }
`;

const SLabel = styled.label`
  position: absolute;
  transform: translateX(-9999rem);
`;
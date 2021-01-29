import React, { FC } from "react";
import { theme } from "shared/styles/theme.styles";
import styled from "styled-components";

interface IProps {
  name: string;
  onChange: (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type: "email" | "password" | "text" | "textarea";
  value: string;
  placeholder?: string;
}

export const FormGroup: FC<IProps> = ({
  name, 
  onChange, 
  placeholder, 
  type, 
  value 
}) => {
  function renderInput() {
    return (
      <SInput
        type={type}
        id={name}
        name={name}
        required
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    );
  }

  function renderTextArea() {
    return (
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        rows={8}
        maxLength={999}
        required
        value={value}
        onChange={onChange}
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
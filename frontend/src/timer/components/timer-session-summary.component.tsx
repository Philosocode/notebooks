import React from "react";
import styled from "styled-components";

import { theme } from "../../shared/styles/theme.style";
import { STextareaBase } from "../../shared/styles/form.style";

interface IProps {
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  value: string;
}
export const TimerSessionSummary: React.FC<IProps> = ({
  handleChange,
  name,
  value
}) => {
  return (
    <STextarea
      placeholder="Enter session summary here"
      value={value}
      onChange={handleChange}
      name={name}
    />
  );
}

const STextarea = styled(STextareaBase)`
  line-height: 1.5;
  padding: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
`;
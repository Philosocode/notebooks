import React from "react";

import { TTimerMode, TTimerState } from "../redux/timer.types";
import { SButtonGreen, SButtonRed } from "shared/styles/button.style";
import styled from "styled-components";
import { theme } from "../../shared/styles/theme.style";

interface IProps {
  handleStart: () => void;
  handleReset: () => void;
  startButtonDisabled: boolean;
  resetButtonDisabled: boolean;
  runningState: TTimerState;
  mode: TTimerMode;
}
export const TimerButtons: React.FC<IProps> = ({
  handleStart,
  startButtonDisabled,
  handleReset,
  resetButtonDisabled,
  runningState,
  mode,
}) => {
  return (
    <SButtons>
      <SButtonGreen onClick={handleStart} disabled={startButtonDisabled}>
        {runningState === "running" ? "Pause" : "Start"}
      </SButtonGreen>

      {mode !== "break" && (
        <SButtonRed disabled={resetButtonDisabled} onClick={handleReset}>Reset</SButtonRed>
      )}
    </SButtons>
  );
}

const SButtons = styled.div`
  & > button {
    margin: ${theme.spacing.base} ${theme.spacing.sm};
  }
`;

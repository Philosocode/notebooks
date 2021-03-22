import React from "react";
import styled from "styled-components";

// logic
import { TTimerMode, TTimerState } from "../redux/timer.types";
import { LONG_BREAK_COUNT } from "../redux/timer.constants";

// styles
import { theme } from "shared/styles/theme.style";
import { SInputBorderless } from "shared/styles/form.style";

interface IProps {
  breakCount: number;
  currentTopic: string;
  input1Value: string;
  input2Value: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  mode: TTimerMode;
  runningState: TTimerState;
  timeText: string;
}
export const TimerDisplay: React.FC<IProps> = ({
  breakCount,
  currentTopic,
  input1Value,
  input2Value,
  handleInputChange,
  mode,
  runningState,
  timeText,
}) => {
  // determine which text should go above the countdown
  function getStudyModeText() {
    if (mode === "switch") return "Study #2";
    if (mode === "break") {
      if (breakCount === LONG_BREAK_COUNT) {
        return "Long Break"
      } else {
        return `Break #${breakCount + 1}`;
      }
    }

    return "Study #1";
  }

  function shouldShowInputs() {
    return mode === "study" && runningState === "stopped";
  }

  // determine whether current topic text should appear below countdown
  function shouldShowCurrentTopic() {
    if (mode === "switch") return true;
    if (mode === "study" && runningState !== "stopped") return true;

    return false;
  }

  return (
    <>
      <SMode>{getStudyModeText()}</SMode>
      <STimeRemaining>{timeText}</STimeRemaining>

      {shouldShowInputs() && (
        <div>
          <SInput name="topic1" value={input1Value} onChange={handleInputChange} placeholder="Topic 1 (required)" />
          <SInput name="topic2" value={input2Value} onChange={handleInputChange} placeholder="Topic 2" />
        </div>
      )}

      {shouldShowCurrentTopic() && (
        <STopicHeading>Current Topic: {currentTopic}</STopicHeading>
      )}
    </>
  );
}

const SMode = styled.h3`
  font-size: ${theme.fontSizes.basePlus};
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const STimeRemaining = styled.h2`
  font-size: ${theme.fontSizes["3xl"]};
  font-weight: 500;
`;

const STopicHeading = styled.h3`
  font-size: ${theme.fontSizes.basePlus};
  font-weight: 400;
`;

const SInput = styled(SInputBorderless)`
  margin-top: ${theme.spacing.sm};
`;

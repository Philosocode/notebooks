import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// logic
import { IModalProps } from "modal/redux/modal.types";
import { selectTimerState } from "timer/redux/timer.selectors";
import { msToMMSS } from "shared/utils/time.util";
import {
  defaultBreakTime,
  defaultStudyTime,
  pauseTimer,
  resetTimer,
  startTimer,
  timerFinished,
  unpauseTimer,
} from "timer/redux/timer.slice";

// styles
import { theme } from "shared/styles/theme.style";
import { SButtonGreen, SButtonRed } from "shared/styles/button.style";
import { useInterval } from "shared/hooks/use-interval.hook";
import { showModal } from "modal/redux/modal.slice";

interface IProps extends IModalProps {}
export const TimerModal: React.FC<IProps> = ({
  handleClose
}) => {
  const dispatch = useDispatch();
  const timerState = useSelector(selectTimerState);
  const { endTime, runningState, mode, pauseTime } = timerState;

  const [timeText, setTimeText] = useState(getTimeText());
  const timerTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (runningState === "stopped") {
      setTimeText(
        mode === "study"
          ? msToMMSS(defaultStudyTime)
          : msToMMSS(defaultBreakTime)
      );
    }
  }, [runningState, mode]);

  // update timer display
  useInterval(() => {
    setTimeText(getTimeText());
  }, runningState === "running" ? 500 : null);

  // start timer
  function handleClick() {
    switch (runningState) {
      case "paused":
        handleUnpause();
        break;
      case "stopped":
        handleStart();
        break;
      case "running":
        handlePause();
        break;
    }
  }

  function handleStart() {
    if (runningState === "running") return;

    dispatch(startTimer());
    
    const intervalTime = mode === "study"
      ? defaultStudyTime
      : defaultBreakTime;

    timerTimeout.current = setTimeout(() => {
      dispatch(timerFinished());
      dispatch(showModal({ modalType: "timer" }));
    }, intervalTime);
  }

  function handlePause() {
    dispatch(pauseTimer());

    if (timerTimeout.current) {
      clearTimeout(timerTimeout.current);
    }
  }

  function handleUnpause() {
    dispatch(unpauseTimer());

    const intervalTime = Date.now() + pauseTime;

    timerTimeout.current = setTimeout(() => {
      dispatch(timerFinished());
      dispatch(showModal({ modalType: "timer" }));
    }, intervalTime);
  }

  function handleStop() {
    dispatch(resetTimer());

    setTimeText(msToMMSS(defaultStudyTime));

    if (timerTimeout.current) {
      clearTimeout(timerTimeout.current);
    }
  }

  function getTimeText() {
    if (runningState === "stopped") {
      return mode === "study"
        ? msToMMSS(defaultStudyTime)
        : msToMMSS(defaultStudyTime);
    }

    const remainingTime = Math.max(endTime - Date.now(), 0);

    return msToMMSS(remainingTime);
  }

  return (
    <SContainer>
      <SMode>{ mode === "study" ? "Study" : "Break"}</SMode>
      <STimeRemaining>{timeText}</STimeRemaining>
      <SButtons>
        <SButtonGreen onClick={handleClick}>
          { runningState === "running" ? "Pause" : "Start" }
        </SButtonGreen>
        {
          mode === "study" && (
            <SButtonRed
              disabled={runningState === "stopped"}
              onClick={handleStop}
            >Stop</SButtonRed>
          )
        }
      </SButtons>
    </SContainer>
  )
}

const SContainer = styled.div`
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  height: 100%;
`;

const SMode = styled.h3`
  font-size: ${theme.fontSizes.basePlus};
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const STimeRemaining = styled.h2`
  font-size: ${theme.fontSizes["3xl"]};
  font-weight: 500;
`;

const SButtons = styled.div`
  & > button {
    margin: ${theme.spacing.base} ${theme.spacing.sm};
  }
`;
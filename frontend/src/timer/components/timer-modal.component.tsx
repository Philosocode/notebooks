import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// logic
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
import { showModal, hideModal } from "../redux/timer.slice";
import { ModalWrapper } from "modal/components/modal-wrapper.component";
import { LabelCheckbox } from "../../shared/components/form/label-checkbox.component";

const checkboxItems = [
  "Summarize what you learned during this study session",
  "Relax. Don't think about what you just studied",
  "Let your subconscious mind process what you just learned",
  "Get up and move around. Get some water or food",
  "Go for a walk. Do some exercise. Take a shower",
];

interface ICheckboxItems {
  [key: string]: boolean;
}

const checkboxHash = checkboxItems.reduce<ICheckboxItems>(
  (acc, _, index) => {
    const stepNumber = "step" + (index + 1);
    acc[stepNumber] = false;

    return acc;
  }, {});


export const TimerModal: React.FC = () => {
  const dispatch = useDispatch();
  const timerState = useSelector(selectTimerState);
  const { endTime, runningState, mode, modalShowing } = timerState;

  const [timeText, setTimeText] = useState(getTimeText());
  const timerTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [values, setValues] = useState(checkboxHash);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValues(prevState => {
      return {
        ...prevState,
        [event.target.name]: event.target.checked
      };
    });
  }

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
  useInterval(
    () => {
      setTimeText(getTimeText());
    },
    runningState === "running" ? 500 : null
  );

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

    const intervalTime = mode === "study" ? defaultStudyTime : defaultBreakTime;

    timerTimeout.current = setTimeout(() => {
      dispatch(timerFinished());
      dispatch(showModal());
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

    const intervalTime = endTime - Date.now();

    timerTimeout.current = setTimeout(() => {
      dispatch(timerFinished());
      dispatch(showModal());
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

  function handleCloseModal() {
    dispatch(hideModal());
  }

  function breakButtonDisabled() {
    if (mode !== "break") return false;
    if (runningState === "running") return true;

    if (values["step1"] !== true) return true;

    return false;
  }

  return (
    <ModalWrapper
      isShowing={modalShowing}
      handleClose={handleCloseModal}
      disableDefaultClose={mode === "break"}
    >
      <SContainer>
        <SMode>{mode === "study" ? "Study" : "Break"}</SMode>
        <STimeRemaining>{timeText}</STimeRemaining>
        <SButtons>
          <SButtonGreen
            onClick={handleClick}
            disabled={breakButtonDisabled()}
          >
            {runningState === "running" ? "Pause" : "Start"}
          </SButtonGreen>
          {mode === "study" && (
            <SButtonRed
              disabled={runningState === "stopped"}
              onClick={handleStop}
            >
              Reset
            </SButtonRed>
          )}
        </SButtons>
        {mode === "break" && (
          <SBreakList>
            {
              checkboxItems.map((item, index) => {
                const stepName = "step" + (index + 1);

                return (
                  <LabelCheckbox
                    key={stepName}
                    htmlFor={stepName}
                    text={checkboxItems[index]}
                    id={stepName}
                    name={stepName}
                    onChange={handleChange}
                    checked={values[stepName]}
                  />
                );
              })
            }
          </SBreakList>
        )}
      </SContainer>
    </ModalWrapper>
  );
};

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

const SBreakList = styled.ul`
  font-size: ${theme.fontSizes.basePlus};
  list-style-type: disc;
  padding: ${theme.spacing.base};
  padding-top: 0;
`;

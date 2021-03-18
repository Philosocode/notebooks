import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import milliseconds from "date-fns/milliseconds";

// logic
import { IUserSettings } from "../../user/redux/user.types";
import { selectTimerState } from "timer/redux/timer.selectors";
import { msToMMSS } from "shared/utils/time.util";
import { useInterval } from "shared/hooks/use-interval.hook";
import { showModal, hideModal } from "../redux/timer.slice";
import {
  pauseTimer,
  resetTimer,
  startTimer,
  timerFinished,
  unpauseTimer,
} from "timer/redux/timer.slice";

// components
import { ModalWrapper } from "modal/components/modal-wrapper.component";
import { LabelCheckbox } from "shared/components/form/label-checkbox.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SButtonGreen, SButtonRed } from "shared/styles/button.style";

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

const audio = new Audio("/alarm-beep.mp3");

interface IProps {
  settings: IUserSettings;
}
export const TimerModal: React.FC<IProps> = ({ settings }) => {
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
      setTimeText(getTimeText());

      // reset checkboxes when switching modes
      setValues(checkboxHash);
    }
    // eslint-disable-next-line
  }, [runningState, mode, settings.defaultBreakTime, settings.defaultStudyTime]);

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

    const duration = getTimerDuration();

    dispatch(startTimer(duration));

    // create timeout for when timer is finished
    timerTimeout.current = setTimeout(() => {
      if (mode === "study") {
        audio.play();
      }
      dispatch(timerFinished());
      dispatch(showModal());
    }, duration);
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

  function handleReset() {
    dispatch(resetTimer());

    const duration = getTimerDuration();
    setTimeText(msToMMSS(duration));

    if (timerTimeout.current) {
      clearTimeout(timerTimeout.current);
    }
  }

  function getTimerDuration() {
    if (mode === "study") {
      return milliseconds({ minutes: settings.defaultStudyTime });
    }

    return milliseconds({ minutes: settings.defaultBreakTime });
  }

  function getTimeText() {
    if (runningState === "stopped") {
      const duration = getTimerDuration();
      return msToMMSS(duration);
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

    // check that the first 2 items are checked
    if (!values["step1"] || !values["step2"]) return true;

    return false;
  }

  return (
    <ModalWrapper
      isShowing={modalShowing}
      handleClose={handleCloseModal}
      disableDefaultClose={mode === "break" && settings.forcedBreaks}
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
            <SButtonRed disabled={runningState === "stopped"} onClick={handleReset}>Reset</SButtonRed>
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

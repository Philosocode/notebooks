import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import milliseconds from "date-fns/milliseconds";

// logic
import { IUserSettings } from "../../user/redux/user.types";
import { selectTimerState } from "timer/redux/timer.selectors";
import { msToMMSS } from "shared/utils/time.util";
import { useInterval } from "shared/hooks/use-interval.hook";
import { showModal, hideModal, switchTopics } from "../redux/timer.slice";
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
import { SInputBorderless } from "shared/styles/form.style";
import { useForm } from "shared/hooks/use-form.hook";

const LONG_BREAK_COUNT = 3;

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
const initialFormState = {
  topic1: "",
  topic2: "",
}
const audio = new Audio("/alarm-beep.mp3");

interface IProps {
  settings: IUserSettings;
}
export const TimerModal: React.FC<IProps> = ({ settings }) => {
  const dispatch = useDispatch();
  const timerState = useSelector(selectTimerState);
  const { endTime, runningState, mode, modalShowing } = timerState;

  const [currentTopic, setCurrentTopic] = useState("");
  const timerTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [values, setValues] = useState(checkboxHash);
  const { values: formValues, handleChange: handleFormChange } = useForm(initialFormState);

  const [numBreaks, setNumBreaks] = useState(0);
  const [timeText, setTimeText] = useState(getTimeText());

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValues(prevState => {
      return {
        ...prevState,
        [event.target.name]: event.target.checked
      };
    });
  }

  // start timer at beginning if setting enabled
  useEffect(() => {
    if (settings.autoStartTimer) {
      handleStart();
    }

    // reset timer state when component unmounts
    return () => {
      handleReset();
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (runningState === "stopped") {
      setTimeText(getTimeText());

      // reset checkboxes when switching modes
      setValues(checkboxHash);
    }
    // eslint-disable-next-line
  }, [runningState, mode, formValues.topic2, settings.defaultBreakTime, settings.defaultStudyTime]);

  // update timer display
  useInterval(
    () => {
      setTimeText(getTimeText());
    },
    runningState === "running" ? 500 : null
  );

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

    if (mode === "break") {
      const duration = getTimerDuration();
      dispatch(startTimer(duration));

      timerTimeout.current = setTimeout(() => {
        dispatch(showModal());
        dispatch(timerFinished());
        setCurrentTopic("");
        setNumBreaks(prevState => prevState + 1);
      }, duration);

      return;
    }

    // handle 1 topic
    if (formValues["topic2"].trim() === "") {
      const duration = getTimerDuration();

      dispatch(startTimer(duration));
      setCurrentTopic(formValues["topic1"]);

      // create timeout for when timer is finished
      timerTimeout.current = setTimeout(() => {
        audio.play();
        dispatch(timerFinished());
        dispatch(showModal());
      }, duration);

      return;
    }

    // handle 2 topics
    // start 2nd topic
    const duration = getTimerDuration() / 2;

    if (mode === "switch") {
      dispatch(startTimer(duration));

      timerTimeout.current = setTimeout(() => {
        audio.play();
        dispatch(timerFinished());
        dispatch(showModal());
      }, duration);
    }
    // start 1st topic
    else {
      dispatch(startTimer(duration));
      setCurrentTopic(formValues["topic1"]);

      timerTimeout.current = setTimeout(() => {
        dispatch(switchTopics());
        dispatch(showModal());
        setCurrentTopic(formValues["topic2"]);
      }, duration);
    }
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
    if (mode === "break") {
      if (numBreaks === LONG_BREAK_COUNT) {
        return milliseconds({ minutes: settings.defaultLongBreakTime });
      } else {
        return milliseconds({ minutes: settings.defaultBreakTime });
      }
    }

    return milliseconds({ minutes: settings.defaultStudyTime });
  }

  function getTimeText() {
    if (runningState === "stopped") {
      let duration = getTimerDuration();

      if (mode !== "break" && formValues["topic2"]) {
        duration /= 2;
      }

      return msToMMSS(duration);
    }

    const remainingTime = Math.max(endTime - Date.now(), 0);

    return msToMMSS(remainingTime);
  }

  function handleCloseModal() {
    dispatch(hideModal());
  }

  function startButtonDisabled() {
    if (mode === "study" && formValues["topic1"].trim() === "") return true;

    if (mode !== "break") return false;
    if (runningState === "running") return true;

    // check that the first 2 items are checked
    if (!values["step1"] || !values["step2"]) return true;

    return false;
  }

  function showCurrentTopic() {
    if (mode === "switch") return true;
    if (mode === "study" && runningState !== "stopped") return true;

    return false;
  }

  function getStudyModeText() {
    if (mode === "break") {
      if (numBreaks === LONG_BREAK_COUNT) {
        return "Long Break"
      } else {
        return `Break #${numBreaks + 1}`;
      }

    }
    if (mode === "switch") return "Study #2";
    return "Study #1";
  }

  return (
    <ModalWrapper
      isShowing={modalShowing}
      handleClose={handleCloseModal}
      disableDefaultClose={mode === "break" && settings.forcedBreaks}
    >
      <SContainer>
        <SMode>{getStudyModeText()}</SMode>
        <STimeRemaining>{timeText}</STimeRemaining>
        {
          mode === "study" && runningState === "stopped" && (
            <div>
              <SInput name="topic1" value={formValues["topic1"]} onChange={handleFormChange} placeholder="Topic 1 (required)" />
              <SInput name="topic2" value={formValues["topic2"]} onChange={handleFormChange} placeholder="Topic 2" />
            </div>
          )
        }
        {
          showCurrentTopic() && (
            <STopicHeading>Current Topic: {currentTopic}</STopicHeading>
          )
        }
        <SButtons>
          <SButtonGreen
            onClick={handleClick}
            disabled={startButtonDisabled()}
          >
            {runningState === "running" ? "Pause" : "Start"}
          </SButtonGreen>
          {mode !== "break" && (
            <SButtonRed disabled={runningState === "stopped"} onClick={handleReset}>Reset</SButtonRed>
          )}
        </SButtons>
        {mode === "break" && (
          <SBreakList>
            {
              checkboxItems.map((_, index) => {
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

const STopicHeading = styled.h3`
  font-size: ${theme.fontSizes.basePlus};
  font-weight: 400;
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

const SInput = styled(SInputBorderless)`
  margin-top: ${theme.spacing.sm};
;
`;
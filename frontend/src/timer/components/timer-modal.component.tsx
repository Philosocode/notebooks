import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import milliseconds from "date-fns/milliseconds";


// logic
import { IUserSettings } from "../../user/redux/user.types";
import { selectTimerState } from "timer/redux/timer.selectors";
import { msToMMSS } from "shared/utils/time.util";
import { useInterval } from "shared/hooks/use-interval.hook";
import { useForm } from "shared/hooks/use-form.hook";
import { showModal, hideModal, switchTopics } from "../redux/timer.slice";
import {
  pauseTimer,
  resetTimer,
  startTimer,
  timerFinished,
  unpauseTimer,
} from "timer/redux/timer.slice";
import { LONG_BREAK_COUNT } from "../redux/timer.constants";

// components
import { TimerChecklist } from "./timer-checklist.component";
import { TimerButtons } from "./timer-buttons.component";
import { TimerDisplay } from "./timer-display.component";
import { ModalWrapper } from "modal/components/modal-wrapper.component";
import { TimerSessionSummary } from "./timer-session-summary.component";

// variables
const initialInputState = {
  topic1: "",
  topic2: "",
  summary: "",
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

  const { values: inputValues, handleChange: handleInputChange } = useForm(initialInputState);

  const [breakCount, setBreakCount] = useState(0);
  const [timeText, setTimeText] = useState(getTimeText());

  // start timer at beginning if setting enabled
  useEffect(() => {
    if (settings.autoStartTimer) {
      handleStart();
    }

    // clear timeout when component unmounts
    return () => {
      clearTimerTimeout();
    }

    // eslint-disable-next-line
  }, []);

  // update timer text whenever runningState, mode, topic, or settings change
  useEffect(() => {
    if (runningState === "stopped") {
      setTimeText(getTimeText());
    }
    // eslint-disable-next-line
  }, [runningState, mode, inputValues.topic2, settings.defaultBreakTime, settings.defaultStudyTime]);

  // hook to update timer display
  useInterval(
    () => {
      setTimeText(getTimeText());
    },
    // if running, update every 500ms
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
    if (mode === "break") {
        handleBreakStart();
    }
    else if (inputValues["topic2"].trim() === "") {
      handleSingleTopicStart();
    }
    else if (mode === "switch") {
      handleSecondTopicStart();
    }
    else {
      handleFirstTopicStart();
    }
  }

  function handleBreakStart() {
    const duration = getTimerDuration();

    dispatch(startTimer(duration));

    timerTimeout.current = setTimeout(() => {
      dispatch(timerFinished());
      dispatch(showModal());

      setCurrentTopic("");
      setBreakCount(prevCount => prevCount + 1);
    }, duration);
  }

  function handleSingleTopicStart() {
    const duration = getTimerDuration();

    dispatch(startTimer(duration));

    setCurrentTopic(inputValues["topic1"]);

    timerTimeout.current = setTimeout(() => {
      audio.play();
      dispatch(timerFinished());
      dispatch(showModal());
    }, duration);
  }

  function handleFirstTopicStart() {
    const duration = getTimerDuration() / 2;

    dispatch(startTimer(duration));

    setCurrentTopic(inputValues["topic1"]);

    timerTimeout.current = setTimeout(() => {
      dispatch(switchTopics());
      dispatch(showModal());
      setCurrentTopic(inputValues["topic2"]);
    }, duration);
  }

  function handleSecondTopicStart() {
    const duration = getTimerDuration() / 2;

    dispatch(startTimer(duration));

    timerTimeout.current = setTimeout(() => {
      audio.play();
      dispatch(timerFinished());
      dispatch(showModal());
    }, duration);
  }

  function getTimerDuration() {
    if (mode === "break") {
      if (breakCount === LONG_BREAK_COUNT) {
        return milliseconds({ minutes: settings.defaultLongBreakTime });
      } else {
        return milliseconds({ minutes: settings.defaultBreakTime });
      }
    }

    return milliseconds({ minutes: settings.defaultStudyTime });
  }

  function handlePause() {
    clearTimerTimeout();

    dispatch(pauseTimer());
  }

  function handleUnpause() {
    const intervalTime = endTime - Date.now();

    timerTimeout.current = setTimeout(() => {
      dispatch(timerFinished());
      dispatch(showModal());
    }, intervalTime);

    dispatch(unpauseTimer());
  }

  function handleReset() {
    clearTimerTimeout();

    // reset timer Redux state to initial state
    dispatch(resetTimer());

    // reset countdown display
    setTimeText(msToMMSS(getTimerDuration()));
  }

  function getTimeText() {
    // if timer not running, use a default time (study, break, long break)
    if (runningState === "stopped") {
      let duration = getTimerDuration();

      // if second topic, divide total time by 2 (each topic gets half the total time)
      if (mode !== "break" && inputValues["topic2"]) {
        duration /= 2;
      }

      return msToMMSS(duration);
    }

    // if timer is running, display remaining time
    const remainingTime = Math.max(endTime - Date.now(), 0);

    return msToMMSS(remainingTime);
  }

  function startButtonDisabled() {
    // disable if topic1 isn't set
    if (mode === "study" && inputValues["topic1"].trim() === "") return true;

    // break mode: disable if break timer is running, or first checkbox item is unchecked
    if (mode === "break") {
      if (runningState === "running") return true;
      if (inputValues.summary.trim() === "") return true;
    }

    return false;
  }

  function clearTimerTimeout() {
    if (timerTimeout.current) {
      clearTimeout(timerTimeout.current);
    }
  }

  function handleCloseModal() {
    dispatch(hideModal());
  }

  return (
    <ModalWrapper
      isShowing={modalShowing}
      handleClose={handleCloseModal}
      disableDefaultClose={mode === "break" && settings.forcedBreaks}
    >
      <SContainer>
        <TimerDisplay
          breakCount={breakCount}
          currentTopic={currentTopic}
          input1Value={inputValues["topic1"]}
          input2Value={inputValues["topic2"]}
          handleInputChange={handleInputChange}
          mode={mode}
          runningState={runningState}
          timeText={timeText}
        />
        <TimerButtons
          handleStart={handleClick}
          handleReset={handleReset}
          startButtonDisabled={startButtonDisabled()}
          resetButtonDisabled={runningState === "stopped"}
          mode={mode}
          runningState={runningState}
        />
        { mode === "break" && (
          <>
            <TimerSessionSummary name="summary" value={inputValues.summary} handleChange={handleInputChange} />
            <TimerChecklist />
          </>
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
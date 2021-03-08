import { createSlice } from "@reduxjs/toolkit";
import milliseconds from "date-fns/milliseconds";

import { ITimerState, TTimerMode } from "./timer.types";

const initialState: ITimerState = {
  endTime: 0,
  pauseTime: 0,
  mode: "study",
  runningState: "stopped",
};

export const defaultStudyTime = milliseconds({ seconds: 10 });
export const defaultBreakTime = milliseconds({ seconds: 5 });

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer: (state) => {
      state.endTime = Date.now() + getTimeIncrement(state.mode);
      state.runningState = "running";
    },
    timerFinished: (state) => {
      state.runningState = "stopped";

      // toggle the mode
      state.mode === "study"
        ? state.mode = "break"
        : state.mode = "study";
    },
    resetTimer: (state) => {
      state.endTime = Date.now() + getTimeIncrement(state.mode);
      state.runningState = "stopped";
    },
    pauseTimer: (state) => {
      state.pauseTime = state.endTime - Date.now();
      state.runningState = "paused";
    },
    unpauseTimer: (state) => {
      state.endTime = Date.now() + state.pauseTime;
      state.runningState = "running";
    },
  },
});

export const timerReducer = timerSlice.reducer;
export const {
  startTimer,
  timerFinished,
  resetTimer,
  pauseTimer,
  unpauseTimer,
} = timerSlice.actions;

/* HELPERS */
function getTimeIncrement(mode: TTimerMode) {
  if (mode === "study") return defaultStudyTime;
  return defaultBreakTime;
}
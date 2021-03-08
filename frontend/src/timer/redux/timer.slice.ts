import { createSlice } from "@reduxjs/toolkit";
import milliseconds from "date-fns/milliseconds";

import { ITimerState, TTimerMode } from "./timer.types";

const initialState: ITimerState = {
  endTime: 0,
  remainingTime: 0,
  mode: "study",
  isRunning: false,
};

const defaultStudyTime = milliseconds({ minutes: 30 });
const defaultBreakTime = milliseconds({ minutes: 5 });

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer: (state) => {
      state.endTime = Date.now() + getTimeIncrement(state.mode);
      state.isRunning = true;
    },
    timerFinished: (state) => {
      state.isRunning = false;

      // toggle the mode
      state.mode === "study"
        ? state.mode = "break"
        : state.mode = "study";
    },
    resetTimer: (state) => {
      state.endTime = Date.now() + getTimeIncrement(state.mode);
      state.isRunning = false;
    },
    pauseTimer: (state) => {
      state.remainingTime = state.endTime - Date.now();
      state.isRunning = false;
    },
    unpauseTimer: (state) => {
      state.endTime = Date.now() + state.remainingTime;
      state.isRunning = true;
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
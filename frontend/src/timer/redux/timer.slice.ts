import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ITimerState } from "./timer.types";

const initialState: ITimerState = {
  endTime: 0,
  pauseTime: 0,
  mode: "study",
  modalShowing: false,
  runningState: "stopped",
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer: (state, action: PayloadAction<number>) => {
      state.endTime = Date.now() + action.payload;
      state.runningState = "running";
    },
    switchTopics: (state) => {
      state.runningState = "stopped";

      state.mode = "switch";
    },
    timerFinished: (state) => {
      state.runningState = "stopped";

      // toggle the mode
      state.mode === "break"
        ? state.mode = "study"
        : state.mode = "break";
    },
    resetTimer: (state) => {
      return {
        ...initialState,
        modalShowing: state.modalShowing,
      };
    },
    pauseTimer: (state) => {
      state.pauseTime = state.endTime - Date.now();
      state.runningState = "paused";
    },
    unpauseTimer: (state) => {
      state.endTime = Date.now() + state.pauseTime;
      state.runningState = "running";
      state.pauseTime = 0;
    },
    showModal: (state) => {
      state.modalShowing = true;
    },
    hideModal: (state) => {
      state.modalShowing = false;
    }
  },
});

export const timerReducer = timerSlice.reducer;
export const {
  startTimer,
  timerFinished,
  switchTopics,
  resetTimer,
  pauseTimer,
  unpauseTimer,
  showModal,
  hideModal,
} = timerSlice.actions;
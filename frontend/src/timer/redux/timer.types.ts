export type TTimerMode = "study" | "break" | "switch";
export type TTimerState = "running" | "paused" | "stopped";

export interface ITimerState {
  endTime: number;
  mode: TTimerMode;
  modalShowing: boolean;
  runningState: TTimerState;
  pauseTime: number; // used for pause / unpause
}
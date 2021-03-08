export type TTimerMode = "study" | "break";
export type TTimerState = "running" | "paused" | "stopped";

export interface ITimerState {
  endTime: number;
  pauseTime: number; // used for pause / unpause
  mode: TTimerMode;
  runningState: TTimerState;
}
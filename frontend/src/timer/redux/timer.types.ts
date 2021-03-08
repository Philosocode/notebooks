export type TTimerMode = "study" | "break";

export interface ITimerState {
  endTime: number;
  remainingTime: number; // used for pause / unpause
  mode: TTimerMode;
  isRunning: boolean;
}
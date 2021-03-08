import { TAppState } from "shared/redux/store";

export const selectTimerState = (state: TAppState) => state.timer;
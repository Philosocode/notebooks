import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAppState } from "./store";

export interface IGlobalState {
  sidebarShowing: boolean;
}

const initialState: IGlobalState = {
  sidebarShowing: false
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setSidebarShowing: (state, action: PayloadAction<boolean>) => {
      state.sidebarShowing = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarShowing = !state.sidebarShowing;
    },
  },
});

export const selectSidebarShowing = (state: TAppState) => state.global.sidebarShowing;

export const globalReducer = globalSlice.reducer;
export const { setSidebarShowing, toggleSidebar } = globalSlice.actions;
import { createSlice } from "@reduxjs/toolkit";
import { ILoadingState } from "./loading.interfaces";

// https://www.reddit.com/r/reactjs/comments/8iek94/react_redux_handling_the_loading_of_multiple/
// 0 == not loading
// >0 == loading
const initialState: ILoadingState = {
  loadingCount: 0,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loadingCount += 1;
    },
    stopLoading: (state) => {
      state.loadingCount -= 1;
    },
  },
});

export const loadingReducer = loadingSlice.reducer;
export const { startLoading, stopLoading } = loadingSlice.actions;

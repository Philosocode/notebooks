import { createSlice } from "@reduxjs/toolkit";
import omit from "lodash/omit";

import { IHookState } from "./hook.types";
import { createHook, deleteHook, getHooks, updateHook } from "./hook.thunks";

const initialState: IHookState  = {
  hooks: {}
};

const hookSlice = createSlice({
  name: "hook",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createHook.fulfilled, (state, action) => {
        const newHook = action.payload.hook;

        state.hooks[newHook.id] = newHook;
      })
      .addCase(getHooks.fulfilled, (state, action) => {
        action.payload.hooks.forEach(hook => {
          // add to hash
          state.hooks[hook.id] = hook;
        })
      })
      .addCase(updateHook.fulfilled, (state, action) => {
        const { hookId, updates } = action.payload;

        const oldHook = state.hooks[hookId];

        state.hooks[hookId] = {
          ...oldHook,
          ...updates,
        }
      })
      .addCase(deleteHook.fulfilled, (state, action) => {
        state.hooks = omit(state.hooks, [action.payload.hookId]);
      })
  }
});

export const hookReducer = hookSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

import { fetchUsers } from "./user.thunk";

interface IUserState {
  users?: any[];
}

const initialState: IUserState = {
  users: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled.type]: (state, action: any) => {
      state.users = action.payload;
    },
  }
});

export const userReducer = userSlice.reducer;

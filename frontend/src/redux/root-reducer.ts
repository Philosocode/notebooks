import { combineReducers } from "redux";

import { userReducer } from "./user/user.slice";

export const rootReducer = combineReducers({
  user: userReducer
});
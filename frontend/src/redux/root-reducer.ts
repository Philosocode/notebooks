import { combineReducers } from "redux";

import { userReducer } from "user/redux/user.slice";

export const rootReducer = combineReducers({
  user: userReducer
});
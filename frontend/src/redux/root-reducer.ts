import { combineReducers } from "redux";

import { authReducer } from "auth/auth.slice";
import { userReducer } from "user/redux/user.slice";

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer
});
import { combineReducers } from "redux";

import { authReducer } from "auth/redux/auth.slice";
import { loadingReducer } from "loading/redux/loading.slice";
import { userReducer } from "user/redux/user.slice";

export const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  user: userReducer,
});
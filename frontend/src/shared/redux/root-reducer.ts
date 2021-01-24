import { combineReducers } from "redux";

import { alertReducer } from "alert/redux/alert.slice";
import { authReducer } from "auth/redux/auth.slice";
import { loadingReducer } from "loading/redux/loading.slice";
import { modalReducer } from "modal/redux/modal.slice";
import { userReducer } from "user/redux/user.slice";

export const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  loading: loadingReducer,
  modal: modalReducer,
  user: userReducer,
});
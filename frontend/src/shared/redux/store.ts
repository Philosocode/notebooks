import { AnyAction, combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";

import { alertReducer } from "alert/redux/alert.slice";
import { authReducer } from "auth/redux/auth.slice";
import { conceptReducer } from "concept/redux/concept.slice";
import { loadingReducer } from "loading/redux/loading.slice";
import { modalReducer } from "modal/redux/modal.slice";
import { userReducer } from "user/redux/user.slice";

const appReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  concept: conceptReducer,
  loading: loadingReducer,
  modal: modalReducer,
  user: userReducer,
});

export type TAppState = ReturnType<typeof appReducer>;

const rootReducer: Reducer = (state: TAppState, action: AnyAction) => {
  // Reset state of Redux on logout
  // FROM: https://stackoverflow.com/a/35641992
  if (action.type === "auth/logout") {
    state = {} as TAppState;
  }

  return appReducer(state, action);
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type TAppDispatch = typeof store.dispatch;

import { AnyAction, combineReducers, configureStore, getDefaultMiddleware, Reducer } from "@reduxjs/toolkit";

import { alertReducer } from "alert/redux/alert.slice";
import { authReducer } from "auth/redux/auth.slice";
import { conceptReducer } from "concept/redux/concept.slice";
import { initReducer } from "./init.slice";
import { loadingReducer } from "loading/redux/loading.slice";
import { materialReducer } from "../../material/redux/material.slice";
import { modalReducer, showModal, hideModal } from "modal/redux/modal.slice";
import { partReducer } from "part/redux/part.slice";
import { userReducer } from "user/redux/user.slice";

const appReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  concept: conceptReducer,
  init: initReducer,
  loading: loadingReducer,
  material: materialReducer,
  modal: modalReducer,
  part: partReducer,
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
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [showModal.type, hideModal.type]
    }
  })
});

export type TAppDispatch = typeof store.dispatch;

import { AnyAction, combineReducers, configureStore, getDefaultMiddleware, Reducer } from "@reduxjs/toolkit";

import { alertReducer } from "alert/redux/alert.slice";
import { conceptReducer } from "concept/redux/concept.slice";
import { factReducer } from "fact/redux/fact.slice";
import { hookReducer } from "hook/redux/hook.slice";
import { initReducer } from "./init.slice";
import { loadingReducer } from "loading/redux/loading.slice";
import { materialReducer } from "../../material/redux/material.slice";
import { modalReducer, showModal, hideModal } from "modal/redux/modal.slice";
import { partReducer } from "part/redux/part.slice";
import { sectionReducer } from "../../section/redux/section.slice";
import { timerReducer } from "timer/redux/timer.slice";
import { userReducer, logout } from "user/redux/user.slice";

const appReducer = combineReducers({
  alert: alertReducer,
  concept: conceptReducer,
  fact: factReducer,
  hook: hookReducer,
  init: initReducer,
  loading: loadingReducer,
  material: materialReducer,
  modal: modalReducer,
  part: partReducer,
  section: sectionReducer,
  timer: timerReducer,
  user: userReducer,
});

export type TAppState = ReturnType<typeof appReducer>;

const rootReducer: Reducer = (state: TAppState, action: AnyAction) => {
  // Reset state of Redux on logout
  // FROM: https://stackoverflow.com/a/35641992
  if (action.type === logout.type) {
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

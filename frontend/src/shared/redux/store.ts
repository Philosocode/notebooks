import { AnyAction, combineReducers, configureStore, getDefaultMiddleware, Reducer } from "@reduxjs/toolkit";

import { alertReducer } from "alert/redux/alert.slice";
import { conceptReducer } from "concept/redux/concept.slice";
import { flashcardReducer } from "flashcard/redux/flashcard.slice";
import { globalReducer } from "./global.slice";
import { hookReducer } from "hook/redux/hook.slice";
import { initReducer } from "./init.slice";
import { loadingReducer } from "loading/redux/loading.slice";
import { notebookReducer } from "../../notebook/redux/notebook.slice";
import { modalReducer, showModal, hideModal } from "modal/redux/modal.slice";
import { sectionReducer } from "section/redux/section.slice";
import { practiceReducer } from "../../practice/redux/practice.slice";
import { noteReducer } from "../../note/redux/note.slice";
import { timerReducer } from "timer/redux/timer.slice";
import { userReducer, logout } from "user/redux/user.slice";

const appReducer = combineReducers({
  alert: alertReducer,
  concept: conceptReducer,
  flashcard: flashcardReducer,
  global: globalReducer,
  hook: hookReducer,
  init: initReducer,
  loading: loadingReducer,
  notebook: notebookReducer,
  modal: modalReducer,
  section: sectionReducer,
  practice: practiceReducer,
  note: noteReducer,
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

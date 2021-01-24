import { createAsyncThunk } from "@reduxjs/toolkit";

import { ICreateAlertPayload } from "./alert.types";
import { hideAlert, showAlert } from "./alert.slice";
import { theme } from "shared/styles/theme.styles";

export const showAndHideAlert = createAsyncThunk(
  "alert/showAndHideAlert",
  async function(payload: ICreateAlertPayload, thunkAPI) {
    thunkAPI.dispatch(showAlert(payload));

    setTimeout(() => {
      thunkAPI.dispatch(hideAlert());
    }, theme.timing.alertShowTime);
  }
)
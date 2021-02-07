import { AnyAction } from "@reduxjs/toolkit";

// FROM: https://stackoverflow.com/a/63082301/9970553
const hasPrefix = (action: AnyAction, prefix: string) =>
  action.type.startsWith(prefix);

export const isPendingMatcher = (action: AnyAction) =>
  action.type.endsWith("/pending");

export const isFulfilledMatcher = (action: AnyAction) =>
  action.type.endsWith("/fulfilled");
  
export const isRejectedMatcher = (action: AnyAction) =>
  action.type.endsWith("/rejected");

export const isPendingAction = (prefix: string) => (
  action: AnyAction
): action is AnyAction => {
  // Note: this cast to AnyAction could also be `any` or whatever fits your case best
  return hasPrefix(action, prefix) && isPendingMatcher(action);
};

export const isRejectedAction = (prefix: string) => (
  action: AnyAction
): action is AnyAction => {
  // Note: this cast to AnyAction could also be `any` or whatever fits your case best - like if you had standardized errors and used `rejectWithValue`
  return hasPrefix(action, prefix) && isRejectedMatcher(action);
};

export const isFulfilledAction = (prefix: string) => (
  action: AnyAction
): action is AnyAction => {
  return hasPrefix(action, prefix) && isFulfilledMatcher(action);
};

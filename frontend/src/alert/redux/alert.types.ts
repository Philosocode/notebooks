export type TAlertType = "success" | "info" | "warning" | "error";

export interface IAlertState {
  message: String;
  type: TAlertType;
  isShowing: boolean;
}

export interface ICreateAlertPayload {
  message: String;
  type: TAlertType;
}
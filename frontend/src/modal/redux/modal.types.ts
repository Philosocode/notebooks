export type TModalType = "add-concept";

export interface IModalState {
  modalShowing: boolean;
  modalType?: TModalType;
  modalProps?: any;
}

export interface IShowModalPayload {
  modalType: TModalType;
  modalProps?: any;
}
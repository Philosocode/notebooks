export type TModalType = "test";

export interface IModalState {
  modalShowing: boolean;
  modalType?: TModalType;
  modalProps?: any;
}

export interface IShowModalPayload {
  modalType: TModalType;
  modalProps?: any;
}
export type TModalType = "create-concept" | "delete-concept" | "update-concept";

export interface IModalState {
  modalShowing: boolean;
  modalType?: TModalType;
  modalProps?: any;
}

export interface IModalProps {
  handleClose: () => void;
}

export interface IShowModalPayload {
  modalType: TModalType;
  modalProps?: any;
}
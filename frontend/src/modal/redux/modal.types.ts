export type TModalType =
  | "create-update-concept"
  | "delete-concept"
  | "confirmation"
  | "delete-tag";

export interface IModalState {
  modalShowing: boolean;
  modalType?: TModalType;
  modalProps?: unknown;
}

export interface IModalProps {
  handleClose: () => void;
}

export interface IShowModalPayload {
  modalType: TModalType;
  modalProps?: unknown;
}

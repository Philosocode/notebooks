export type TModalType =
  | "create-concept"
  | "delete-concept"
  | "update-concept"
  | "confirmation"
  | "delete-tag"
  | "update-tag"

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

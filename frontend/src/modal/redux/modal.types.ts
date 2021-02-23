export type TModalType =
  | "create-concept"
  | "delete-concept"
  | "update-concept"
  | "create-concept-link"
  | "delete-tag"
  | "update-tag"
  | "confirmation"

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

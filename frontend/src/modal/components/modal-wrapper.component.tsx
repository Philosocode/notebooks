import React, { FC, MouseEvent } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";

import { CircleIcon } from "../../shared/components/button/circle-icon.component";

import { theme } from "../../shared/styles/theme.style";
import modalStyles from "./modal.module.css";

interface IProps {
  children?: React.ReactNode;
  isShowing: boolean;
  handleClose: (event: MouseEvent) => void;
  handleBack?: () => void;
  disableDefaultClose?: boolean;
  isWide?: boolean;
}
export const ModalWrapper: FC<IProps> = ({
  isShowing,
  handleBack,
  handleClose,
  children,
  disableDefaultClose,
  isWide,
}) => {
  ReactModal.setAppElement("#root");

  let modalClasses = modalStyles.modal;
  if (isWide) {
    modalClasses += ` ${modalStyles.wide}`;
  }

  return (
    <ReactModal
      isOpen={isShowing}
      onRequestClose={handleClose}
      closeTimeoutMS={150}
      shouldCloseOnEsc={!disableDefaultClose}
      shouldCloseOnOverlayClick={!disableDefaultClose}
      className={modalClasses}
      overlayClassName={modalStyles.overlay}
    >
      {handleBack && <SBackIcon handleClick={handleBack} icon="arrow-left" />}
      { !disableDefaultClose && <SCloseIcon handleEventClick={handleClose} icon="times" /> }
      {children}
    </ReactModal>
  );
};

const SIcon = styled(CircleIcon)`
  cursor: pointer;
  font-size: ${theme.fontSizes.basePlus};
  position: absolute;
  top: 0.5em;
`;

const SBackIcon = styled(SIcon)`
  left: 0.6em;
`;

const SCloseIcon = styled(SIcon)`
  right: 0.6em;
`;
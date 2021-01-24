import React, { FC, MouseEvent } from "react";
import ReactModal from "react-modal";
import styled, { CSSProperties } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "../../shared/styles/theme.styles";

interface IProps {
  children?: React.ReactNode;
  isShowing: boolean;
  handleClose: (event: MouseEvent) => void;
}

export const ModalWrapper: FC<IProps> = ({ isShowing, handleClose, children }) => {
  const contentStyles: CSSProperties = {
    left: "50%",
    top: "40%",
    transform: "translate(-50%, -50%)",
    padding: `${theme.spacing.md} ${theme.spacing.base}`,
    width: "80rem",
    maxWidth: "90vw",
  };

  const overlayStyles: CSSProperties = {
    background: "rgba(0,0,0,0.5)",
  };

  ReactModal.setAppElement("#root");

  return (
    <ReactModal
      isOpen={isShowing}
      onRequestClose={handleClose}
      style={{
        content: contentStyles,
        overlay: overlayStyles,
      }}
    >
      <SCloseIcon onClick={handleClose} icon="times" />
      {children}
    </ReactModal>
  );
};

const SCloseIcon = styled(FontAwesomeIcon)`
  color: #333;
  cursor: pointer;
  font-size: 2.4rem;
  position: absolute;
    top: 0.4em;
    right: 0.6em;
`;

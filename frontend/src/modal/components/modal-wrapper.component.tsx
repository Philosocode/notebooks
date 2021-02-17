import React, { FC, MouseEvent } from "react";
import ReactModal from "react-modal";
import styled, { CSSProperties } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "../../shared/styles/theme.style";

interface IProps {
  children?: React.ReactNode;
  isShowing: boolean;
  handleClose: (event: MouseEvent) => void;
  handleBack?: () => void;
  styles?: CSSProperties;
}

export const ModalWrapper: FC<IProps> = ({ isShowing, handleBack, handleClose, children, styles }) => {
  const contentStyles: CSSProperties = {
    minHeight: "50vh",
    maxHeight: "90vh",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    padding: `${theme.spacing.md} ${theme.spacing.base}`,
    width: "60rem",
    maxWidth: "90vw",
    zIndex: theme.zIndices.modal,
    ...styles
  };

  const overlayStyles: CSSProperties = {
    background: "rgba(0,0,0,0.5)",
    zIndex: theme.zIndices.modal,
  };

  ReactModal.setAppElement("#root");

  return (
    <ReactModal
      isOpen={isShowing}
      onRequestClose={handleClose}
      closeTimeoutMS={150}
      style={{
        content: contentStyles,
        overlay: overlayStyles,
      }}
    >
      { handleBack && <SBackIcon onClick={handleBack} icon="arrow-left" /> }
      <SCloseIcon onClick={handleClose} icon="times" />
      {children}
    </ReactModal>
  );
};


const SIcon = styled(FontAwesomeIcon)`
  color: ${theme.colors.gray["700"]};
  cursor: pointer;
  font-size: 2.4rem;
  position: absolute;
    top: 0.5em;
`;

const SBackIcon = styled(SIcon)`
  left: 0.6em;
`;

const SCloseIcon = styled(SIcon)`
    right: 0.6em;
`;

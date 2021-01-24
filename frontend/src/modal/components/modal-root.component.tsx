import React, { FC, useCallback } from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import styled, { CSSProperties } from "styled-components";

import { TAppState } from "redux/store";
import { hideModal } from "modal/redux/modal.slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "../../shared/styles/theme.styles";

interface IProps {
  children?: React.ReactNode;
}

export const ModalRoot: FC<IProps> = ({ children }) => {
  const modalState = useSelector(((state: TAppState) => state.modal));
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(hideModal());
  }, []);

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

  // if (!modalState.modalType) return null;
  return (
    <ReactModal
      isOpen={true}
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
    top: 0.5em;
    right: 0.5em;
`;

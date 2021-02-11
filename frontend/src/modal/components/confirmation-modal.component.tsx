import React, { FC } from "react";
import styled from "styled-components";

import { theme } from "shared/styles/theme.style";
import { SHeadingSubtitle } from "shared/styles/typography.style";
import { SButtonGreen, SButtonRed, SButton } from "shared/styles/button.style";

interface IProps {
  title: string;
  text: string;
  confirmButtonText: string;
  handleClose: () => void;
  handleConfirm: () => void;
  isWarning?: boolean;
}
export const ConfirmationModal: FC<IProps> = ({
  handleConfirm,
  handleClose,
  title,
  text,
  confirmButtonText,
  isWarning,
}) => {
  function handleClick() {
    handleConfirm();
    handleClose();
  }

  const SButtonToRender = isWarning? SButtonRed : SButtonGreen;

  return (
    <SContent>
      <SHeadingSubtitle>{title}</SHeadingSubtitle>
      <p>{text}</p>
      <SButtonToRender onClick={handleClick}>{confirmButtonText}</SButtonToRender>
      <SCancelButton onClick={handleClose}>Cancel</SCancelButton>
    </SContent>
  );
};

const SContent = styled.div`
  & * + * {
    margin-top: ${theme.spacing.base};
  }
`;

const SCancelButton = styled(SButton)`
  margin-left: 1.5em;
`;
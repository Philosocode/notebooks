import React, { useState } from "react";
import styled from "styled-components";

// logic
import { THookType } from "hook/hook.types";

// components
import { ModalWrapper } from "modal/components/modal-wrapper.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SHeadingSubtitle } from "shared/styles/typography.style";
import { HookTypes } from "./hook-types.component";

interface IProps {
  modalShowing: boolean;
  setModalShowing: (showing: boolean) => void;
}
export const HookSelectModal: React.FC<IProps> = ({
  modalShowing,
  setModalShowing
}) => {
  const [hookType, setHookType] = useState<THookType>();
  const [mode, setMode] = useState<"type" | "select">("type");

  function handleBack() {
    setMode("type");
  }

  function hideModal() {
    setModalShowing(false);
  }

  function setType(type: THookType) {
    setHookType(type);
    setMode("select");
  }

  return (
    <>
      <ModalWrapper
        handleBack={mode !== "type" ? handleBack : undefined}
        handleClose={hideModal}
        isShowing={modalShowing}
      >
        {/* Select Hook Type */}
        <SModalPanel isShowing={mode === "type"}>
          <SHeadingSubtitle>Select Type</SHeadingSubtitle>
          <HookTypes handleSelectHookType={setType} />
        </SModalPanel>

        {/* Select Hook */}
        <SModalPanel isShowing={mode === "select"}>
          <SHeadingSubtitle>Select Hook</SHeadingSubtitle>
        </SModalPanel>
      </ModalWrapper>
    </>
  );
};

interface SModalPanelProps {
  isShowing: boolean;
}
const SModalPanel = styled.div<SModalPanelProps>`
  display: ${props => props.isShowing ? "block" : "none"}
`;
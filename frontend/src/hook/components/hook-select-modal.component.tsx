import React, { useState } from "react";
import styled from "styled-components";

// logic
import { THookType } from "hook/redux/hook.types";

// components
import { ModalWrapper } from "modal/components/modal-wrapper.component";
import { HookTypes } from "./hook-types.component";

// styles
import { SHeadingSubtitle } from "shared/styles/typography.style";
import { HookSelect } from "./hook-select.component";

interface IProps {
  modalShowing: boolean;
  setModalShowing: (showing: boolean) => void;
  setHook: (hook: string) => void;
}
export const HookSelectModal: React.FC<IProps> = ({
  modalShowing,
  setModalShowing,
  setHook,
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

  function handleSelectHook(hook: string) {
    setHook(hook);
    setModalShowing(false);
  }

  function getModalStyles() {
    if (mode === "select") {
      return { width: "80vw" };
    }
  }

  return (
    <>
      <ModalWrapper
        handleBack={mode !== "type" ? handleBack : undefined}
        handleClose={hideModal}
        isShowing={modalShowing}
        styles={getModalStyles()}
      >
        {/* Select Hook Type */}
        <SModalPanel isShowing={mode === "type"}>
          <SHeadingSubtitle>Select Type</SHeadingSubtitle>
          <HookTypes handleSelectHookType={setType} />
        </SModalPanel>

        {/* Select Hook */}
        <SModalPanel isShowing={mode === "select"}>
          {
            hookType && (
              <HookSelect
                handleSelectHook={handleSelectHook}
                hookType={hookType}
              />
            )
          }
        </SModalPanel>
      </ModalWrapper>
    </>
  );
};

interface SModalPanelProps {
  isShowing: boolean;
}
const SModalPanel = styled.div<SModalPanelProps>`
  display: ${(props) => (props.isShowing ? "block" : "none")};
`;
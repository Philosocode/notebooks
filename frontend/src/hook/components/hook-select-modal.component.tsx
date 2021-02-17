import React, { useEffect, useState } from "react";
import styled from "styled-components";

// logic
import { THookType } from "hook/hook.types";
import { convertToTitleCase } from "shared/utils/string.util";
import { allHooksHash } from "hook/data/hooks.data";

// components
import { ModalWrapper } from "modal/components/modal-wrapper.component";
import { HookTypes } from "./hook-types.component";
import { HookGrid } from "./hook-grid.component";

// styles
import { SHeadingSubtitle } from "shared/styles/typography.style";

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

  useEffect(() => {
    if (modalShowing) {
      setMode("type");
    }
  }, [modalShowing]);

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
          <SHeadingSubtitle>
            Select Hook: {hookType && convertToTitleCase(hookType)}
          </SHeadingSubtitle>
          {
            hookType && (
              <HookGrid
                handleSelect={handleSelectHook}
                hooks={allHooksHash[hookType]}
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
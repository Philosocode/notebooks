import React, { useState } from "react";
import styled from "styled-components";

// logic
import { THookType } from "hook/hook.types";
import { allHooksHash } from "../data/hooks.data";

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

  function getModalStyles() {
    if (mode === "select") {
      return {
        width: "80vw",
        height: "max-content"
      };
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
          <SHeadingSubtitle>Select Hook</SHeadingSubtitle>
          <SHookList>
            {
              hookType && allHooksHash[hookType].map(hook => (
                <SHookCard>{hook}</SHookCard>
              ))
            }
          </SHookList>
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

const SHookList = styled.div`
  display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    justify-items: space-between;
    gap: ${theme.spacing.base};
  margin-top: ${theme.spacing.sm};
`;

const SHookCard = styled.div`
  background: ${theme.colors.gray[100]};
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  padding: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colors.green[400]};
    color: ${theme.colors.white};
  }
`;
import React, { useEffect, useState } from "react";
import styled from "styled-components";

// logic
import { THookType } from "hook/hook.types";
import { allHooksHash } from "../data/hooks.data";
import { convertToTitleCase } from "shared/utils/string.util";

// components
import { ModalWrapper } from "modal/components/modal-wrapper.component";
import { HookTypes } from "./hook-types.component";

// styles
import { theme } from "shared/styles/theme.style";
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
          <SHookList>
            {hookType &&
              allHooksHash[hookType].map((hook) => (
                <SHookCard key={hook} onClick={() => handleSelectHook(hook)}>
                  {hook}
                </SHookCard>
              ))}
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
  display: ${(props) => (props.isShowing ? "block" : "none")};
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
  box-shadow: ${theme.boxShadows.light};
  cursor: pointer;
  font-weight: 500;
  padding: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colors.green[400]};
    color: ${theme.colors.white};
  }
`;

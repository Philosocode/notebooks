import React, { useState } from "react";
import styled from "styled-components";

// logic
import { THookType } from "hook/hook.types";

// styles
import { theme } from "shared/styles/theme.style";
import { ModalWrapper } from "modal/components/modal-wrapper.component";

const noHookSelectedText = `No hook selected. Click here to choose a hook.`;

interface IProps {
  hookType: THookType;
  selectedHook: string;
  setSelectedHook: (hook: string) => void;
}
export const HookSelect: React.FC<IProps> = ({
  hookType,
  selectedHook,
  setSelectedHook
}) => {
  const [modalShowing, setModalShowing] = useState(false);

  function showHookSelectModal() {
    setModalShowing(true);
  }

  function hideHookSelectModal() {
    setModalShowing(false);
  }

  return (
    <SHookSelectContainer>
      <SHookText onClick={showHookSelectModal}>
        {selectedHook || noHookSelectedText}
      </SHookText>

      <ModalWrapper
        handleClose={hideHookSelectModal}
        isShowing={modalShowing}
      />
    </SHookSelectContainer>
  );
};

const SHookSelectContainer = styled.div`
  background: ${theme.colors.gray[100]};
  border-radius: 5px;
  box-shadow: ${theme.boxShadows.light};
  cursor: pointer;
  font-size: ${theme.fontSizes.md};
  margin-top: ${theme.spacing.md};
  width: max-content;
`;

const SHookText = styled.p`
  padding: ${theme.spacing.base};
`;
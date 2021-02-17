import React from "react";
import styled from "styled-components";

import { THookType } from "hook/hook.types";
import { theme } from "shared/styles/theme.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBrain,
  faMemory,
  faNetworkWired,
} from "@fortawesome/free-solid-svg-icons";

interface IProps {
  handleSelectHookType: (hookType: THookType) => void;
}
export const HookTypes: React.FC<IProps> = ({
  handleSelectHookType,
}) => {
  const hookTypes: { name: THookType; icon: IconProp }[] = [
    { name: "process", icon: faBrain },
    { name: "connect", icon: faNetworkWired },
    { name: "memorize", icon: faMemory },
  ];

  return (
    <SHookTypes>
      {hookTypes.map((hookType) => (
        <SHookType
          key={hookType.name}
          onClick={() => handleSelectHookType(hookType.name)}
        >
          <SIcon icon={hookType.icon} />
          {hookType.name}
        </SHookType>
      ))}
    </SHookTypes>
  );
};

const SHookTypes = styled.ul`
  display: flex;
    justify-content: space-between;
  margin-top: ${theme.spacing.base};
`;

const SHookType = styled.li`
  background: ${theme.colors.gray[100]};
  border-radius: 5px;
  box-shadow: ${theme.boxShadows.light};
  cursor: pointer;
  font-weight: 500;
  padding: ${theme.spacing.sm};
  text-transform: uppercase;

  &:hover {
    background: ${theme.colors.green[400]};
    color: ${theme.colors.offWhite};
  }
`;

const SIcon = styled(FontAwesomeIcon)`
  margin-right: ${theme.spacing.xs};
`;

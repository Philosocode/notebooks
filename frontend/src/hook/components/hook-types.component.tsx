import React from "react";
import styled from "styled-components";

import { THookType } from "hook/redux/hook.types";
import { theme } from "shared/styles/theme.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBrain,
  faFireAlt,
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
    { name: "common", icon: faFireAlt },
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
  margin-top: ${theme.spacing.base};
  
  ${theme.media.tabPort} {
    display: grid;
      grid-template-columns: 1fr 1fr;
      row-gap: ${theme.spacing.base};
      column-gap: ${theme.spacing.md};
  }
`;

const SHookType = styled.li`
  background: ${theme.colors.gray[100]};
  border-radius: 5px;
  box-shadow: ${theme.boxShadows.light};
  cursor: pointer;
  font-weight: 500;
  margin-top: ${theme.spacing.base};
  padding: ${theme.spacing.sm};
  text-transform: uppercase;
  
  ${theme.media.tabPort} {
    margin-top: 0;
  }

  &:hover {
    background: ${theme.colors.green[400]};
    color: ${theme.colors.white};
  }
`;

const SIcon = styled(FontAwesomeIcon)`
  margin-right: ${theme.spacing.xs};
`;

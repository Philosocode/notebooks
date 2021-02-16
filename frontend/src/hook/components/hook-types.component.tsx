import React from "react";
import styled from "styled-components";

import { THookType } from "hook/hook.types";
import { theme } from "shared/styles/theme.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBrain,
  faMagic,
  faMemory,
  faNetworkWired,
  faRandom,
} from "@fortawesome/free-solid-svg-icons";

interface IProps {
  handleSelectHookType: (hookType: THookType) => void;
  selectedHookType: THookType | undefined;
}
export const HookTypes: React.FC<IProps> = ({
  handleSelectHookType,
  selectedHookType,
}) => {
  const hookTypes: { name: THookType; icon: IconProp }[] = [
    { name: "process", icon: faBrain },
    { name: "connect", icon: faNetworkWired },
    { name: "memorize", icon: faMemory },
    { name: "custom", icon: faMagic },
    { name: "random", icon: faRandom },
  ];

  return (
    <SHookTypes>
      {hookTypes.map((hookType) => (
        <SHookType
          key={hookType.name}
          isSelected={hookType.name === selectedHookType}
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
  margin-top: ${theme.spacing.base};
`;

interface SHookTypeProps {
  isSelected: boolean;
}
const SHookType = styled.li<SHookTypeProps>`
  background: ${(props) =>
    props.isSelected ? theme.colors.green[400] : theme.colors.gray[100]};
  border-radius: 5px;
  box-shadow: ${theme.boxShadows.light};
  color: ${(props) => props.isSelected && theme.colors.offWhite};
  cursor: pointer;
  font-weight: 500;
  padding: ${theme.spacing.sm};
  margin-right: ${theme.spacing.md};
  text-transform: uppercase;

  &:last-child {
    margin-right: 0;
  }
`;

const SIcon = styled(FontAwesomeIcon)`
  margin-right: ${theme.spacing.xs};
`;

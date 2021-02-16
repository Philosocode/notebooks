import React from "react";
import styled from "styled-components";

import { THookType } from "hook/hook.types";
import { theme } from "shared/styles/theme.style";

interface IProps {
  handleSelectHookType: (hookType: THookType) => void;
  selectedHookType: THookType | undefined;
}
export const HookTypes: React.FC<IProps> = ({
  handleSelectHookType,
  selectedHookType,
}) => {
  const hookTypes: THookType[] = ["process", "connect", "memorize"];
  return (
    <SHookTypes>
      {hookTypes.map((hookType) => (
        <SHookType
          key={hookType}
          isSelected={hookType === selectedHookType}
          onClick={() => handleSelectHookType(hookType)}
        >
          {hookType}
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
  border-radius: 2rem;
  box-shadow: ${theme.boxShadows.light};
  color: ${(props) => props.isSelected && theme.colors.offWhite};
  cursor: pointer;
  font-weight: 500;
  padding: ${theme.spacing.base};
  margin-right: ${theme.spacing.md};
  text-transform: uppercase;

  &:last-child {
    margin-right: 0;
  }
`;

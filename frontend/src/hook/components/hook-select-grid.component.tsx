import React from "react";
import styled from "styled-components";

import { theme } from "../../shared/styles/theme.style";

interface IProps {
  handleSelect: (hook: string) => void;
  hooks: string[];
}
export const HookSelectGrid: React.FC<IProps> = ({ handleSelect, hooks }) => {
  return (
    <SHookList>
      {hooks.map((hook) => (
          <SHookCard key={hook} onClick={() => handleSelect(hook)}>
            {hook}
          </SHookCard>
        ))}
    </SHookList>
  );
};

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

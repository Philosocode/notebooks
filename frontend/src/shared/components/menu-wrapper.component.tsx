import React, { FC } from "react";
import { theme } from "shared/styles/theme.styles";
import styled from "styled-components";

interface IAction {
  action: any;
  name: string;
  icon: JSX.Element;
}

interface IProps {
  showing: boolean;
  actions: IAction[];
}
export const MenuWrapper: FC<IProps> = ({ actions, showing }) => {
  if (!showing) return null;

  return (
    <SContainer>
      {
        actions.map(action => (
          <SAction onClick={action.action} key={action.name}>{action.name}</SAction>
        ))
      }
    </SContainer>
  )
};

const SContainer = styled.div`
  border: 1px solid ${theme.colors.gray[100]};
  border-top: none;
  display: flex;
    flex-direction: column;
  position: absolute;
    right: calc(100% + 1rem);
    top: 0%;
  width: max-content;
`;

const SAction = styled.button`
  border: none;
  border-top: 1px solid ${theme.colors.gray[100]};
  cursor: pointer;
  padding: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colors.gray[100]};
  }

  &:active,
  &:focus {
    outline: 1px solid ${theme.colors.gray[200]};
  }
`;
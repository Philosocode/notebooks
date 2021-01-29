import React, { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styled from "styled-components";

import { theme } from "shared/styles/theme.styles";

export interface IMenuAction {
  action: any;
  name: string;
  icon: IconProp;
}

interface IProps {
  actions: IMenuAction[];
}

export const Menu: FC<IProps> = ({ actions }) => {
  const [menuShowing, setMenuShowing] = useState(false);

  useEffect(() => {
    menuShowing
      ? document.addEventListener("mousedown", hideMenu)
      : document.removeEventListener("mousedown", hideMenu);
  }, [menuShowing]);

  const showMenu = () => setMenuShowing(true);
  const hideMenu = () => setMenuShowing(false);

  function handleActionClick(action: () => void) {
    hideMenu();
    action();
  }

  return (
    <SContainer>
      <SIcon icon="ellipsis-v" onClick={showMenu} />
      {menuShowing ? (
        <SActionList>
          {
            actions.map(action => (
              <SAction onClick={() => handleActionClick(action.action)} key={action.name}>
                <SActionIcon icon={action.icon} />
                {action.name}
              </SAction>
            ))
          }
        </SActionList>
      ) : null}
    </SContainer>
  );
};

const SContainer = styled.div`
  position: relative;
  width: max-content;
`;

const SIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 2.5rem;
`;

const SActionList = styled.div`
  border: 1px solid ${theme.colors.gray[100]};
  border-top: none;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 1.5rem;
  top: 0;
  width: max-content;
`;

const SAction = styled.button`
  border: none;
  border-top: 1px solid ${theme.colors.gray[100]};
  cursor: pointer;
  text-align: left;
  padding: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colors.gray[100]};
  }

  &:active,
  &:focus {
    outline: 1px solid ${theme.colors.gray[200]};
  }
`;

const SActionIcon = styled(FontAwesomeIcon)`
  margin-right: ${theme.spacing.sm};
`;
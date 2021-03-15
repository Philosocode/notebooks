import React, { FC, MutableRefObject, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styled from "styled-components";

import { theme } from "shared/styles/theme.style";

export interface IMenuAction {
  action: any;
  name: string;
  icon: IconProp;
}
interface IProps {
  actions: IMenuAction[];
  menuShowing: boolean;
  toggleMenu: () => void;
}
// Referenced: https://letsbuildui.dev/articles/building-a-dropdown-menu-component-with-react-hooks
export const Menu: FC<IProps> = ({
  actions,
  menuShowing,
  toggleMenu
}) => {
  const menuRef = useRef() as MutableRefObject<HTMLDivElement>;

  // hide menu when clicking elsewhere on the page
  useEffect(() => {
    if (menuShowing) window.addEventListener("mousedown", hideMenu);
    return () => { window.removeEventListener("mousedown", hideMenu); }
  }, [menuShowing]);

  function hideMenu(event: React.MouseEvent | MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      toggleMenu();
    }
  }

  function handleActionClick(event: React.MouseEvent, action: () => void) {
    event.stopPropagation();
    event.preventDefault();

    action();
    toggleMenu();
  }

  return (
    <>
      {menuShowing ? (
        <SMenu ref={menuRef}>
          <SActionList>
            {
              actions.map(action => (
                <SAction
                  key={action.name}
                  onClick={(event) => handleActionClick(event, action.action)}
                >
                  <SActionIcon icon={action.icon} />
                  {action.name}
                </SAction>
              ))
            }
          </SActionList>
        </SMenu>
      ) : null}
    </>
  );
};

const SMenu = styled.div`
  position: absolute;
  width: max-content;
`;

const SActionList = styled.div`
  background: ${theme.colors.gray[100]};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.xs};
  overflow: hidden;
`;

const SAction = styled.button`
  background: transparent;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  font-weight: 500;
  padding: ${theme.spacing.sm};
  text-align: left;

  &:hover {
    background: ${theme.colors.gray[200]};
  }

  &:active,
  &:focus {
    outline: 1px solid ${theme.colors.gray[200]};
  }
`;

const SActionIcon = styled(FontAwesomeIcon)`
  margin-right: ${theme.spacing.sm};
`;
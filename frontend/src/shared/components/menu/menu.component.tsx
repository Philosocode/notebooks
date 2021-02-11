import React, { FC, MutableRefObject, useEffect, useRef, useState } from "react";
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
}

// Referenced: https://letsbuildui.dev/articles/building-a-dropdown-menu-component-with-react-hooks
export const Menu: FC<IProps> = ({ actions }) => {
  const [menuShowing, setMenuShowing] = useState(false);
  const menuRef = useRef() as MutableRefObject<HTMLDivElement>;

  // hide menu when clicking elsewhere on the page
  useEffect(() => {
    if (menuShowing) window.addEventListener("mousedown", hideMenu);
    return () => { window.removeEventListener("mousedown", hideMenu); }
  }, [menuShowing]);

  function showMenu(event: React.MouseEvent) {
    event.stopPropagation();
    event.preventDefault();

    setMenuShowing(true);
  }

  function hideMenu(event: React.MouseEvent | MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuShowing(false);
    }
  }

  function handleActionClick(event: React.MouseEvent, action: () => void) {
    event.stopPropagation();
    event.preventDefault();

    action();
    setMenuShowing(false);
  }

  return (
    <SContainer>
      <SIcon icon="ellipsis-v" onClick={showMenu} />
      {menuShowing ? (
        <div ref={menuRef}>
         <SActionList>
            {
              actions.map(action => (
                <SAction onClick={(event) => handleActionClick(event, action.action)} key={action.name}>
                  <SActionIcon icon={action.icon} />
                  {action.name}
                </SAction>
              ))
            }
          </SActionList>
        </div>
      ) : null}
    </SContainer>
  );
};

const SContainer = styled.div`
  display: flex;
    align-items: center;
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
    top: 1rem;
  width: max-content;
`;

const SAction = styled.button`
  border: 1px solid ${theme.colors.gray[200]};
  cursor: pointer;
  text-align: left;
  padding: ${theme.spacing.sm};

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
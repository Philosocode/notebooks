import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import { IUser } from "auth/redux/auth.types";
import { IMenuAction, Menu } from "../menu/menu.component";
import { useToggle } from "shared/hooks/use-toggle.hook";
import { logout } from "auth/redux/auth.slice";
import { theme } from "../../styles/theme.style";

interface IProps {
  user?: IUser;
}
export const NavProfileMenu: React.FC<IProps> = ({ user }) => {
  const [menuShowing, toggleMenuShowing] = useToggle(false);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  const menuActions: IMenuAction[] = [
    { name: "Profile", icon: faUserCircle, action: handleLogout },
    { name: "Logout", icon: faSignOutAlt, action: handleLogout },
  ];

  if (!user) return null;
  return (
    <SProfilePictureContainer>
      <SProfilePicture src={user?.photo_url} alt={user?.name} onClick={toggleMenuShowing} />
      <SMenuContainer>
        <Menu actions={menuActions} toggleMenu={toggleMenuShowing} menuShowing={menuShowing} />
      </SMenuContainer>
    </SProfilePictureContainer>
  );
};

const SProfilePictureContainer = styled.li`
  cursor: pointer;
  display: flex;
    justify-content: center;
    align-items: center;
  margin-left: ${theme.spacing.base};
`;

const SProfilePicture = styled.img`
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
`;

const SMenuContainer = styled.div`
  position: relative;
  transform: translate(-11rem, 2rem);
`;

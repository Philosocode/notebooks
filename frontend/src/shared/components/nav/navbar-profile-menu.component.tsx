import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import { IMenuAction, Menu } from "../menu/menu.component";
import { useToggle } from "shared/hooks/use-toggle.hook";
import { logout } from "auth/redux/auth.slice";
import { theme } from "../../styles/theme.style";
import { SettingsModal } from "../../../user/components/settings-modal.component";
import { IUser } from "../../../user/redux/user.types";
import { getUserSettings } from "../../../user/redux/user.thunks";

interface IProps {
  user: IUser;
}
export const NavbarProfileMenu: React.FC<IProps> = ({ user }) => {
  const [menuShowing, toggleMenuShowing] = useToggle(false);
  const [settingsModalShowing, toggleSettingsModal] = useToggle(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.settings) {
      dispatch(getUserSettings(user.id));
    }
  }, []);

  function handleLogout() {
    dispatch(logout());
  }

  const menuActions: IMenuAction[] = [
    { name: "Settings", icon: "cog", action: toggleSettingsModal },
    { name: "Logout", icon: faSignOutAlt, action: handleLogout },
  ];

  if (!user) return null;
  return (
    <>
      <SProfilePictureContainer>
        <SProfilePicture src={user.photo_url} alt={user.name} onClick={toggleMenuShowing} />
        <SMenuContainer>
          <Menu actions={menuActions} toggleMenu={toggleMenuShowing} menuShowing={menuShowing} />
        </SMenuContainer>
      </SProfilePictureContainer>
      {
        user.settings && (
          <SettingsModal
            modalShowing={settingsModalShowing}
            toggleModal={toggleSettingsModal}
            currentSettings={user.settings}
          />
        )
      }
    </>
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

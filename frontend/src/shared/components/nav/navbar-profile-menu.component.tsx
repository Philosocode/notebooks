import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { faInfoCircle, faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";

// logic
import { IUser } from "user/redux/user.types";
import { IMenuAction, Menu } from "../menu/menu.component";
import { useToggle } from "shared/hooks/use-toggle.hook";
import { logout } from "user/redux/user.slice";
import { selectSettings } from "user/redux/user.selectors";

// components
import { SettingsModal } from "user/components/settings-modal.component";

// styles
import { theme } from "../../styles/theme.style";
import { updateUserSettings } from "../../../user/redux/user.thunks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
  user: IUser;
}
export const NavbarProfileMenu: React.FC<IProps> = ({ user }) => {
  const [menuShowing, toggleMenuShowing] = useToggle(false);
  const [settingsModalShowing, toggleSettingsModal] = useToggle(false);
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);

  function handleTutorial() {
    dispatch(
      updateUserSettings({
        userId: "test",
        updates: {
          showWelcomeWizard: true,
        },
      })
    );
  }

  function handleLogout() {
    dispatch(logout());
  }

  const menuActions: IMenuAction[] = [
    { name: "Settings", icon: "cog", action: toggleSettingsModal },
    { name: "Tutorial", icon: faInfoCircle, action: handleTutorial },
    { name: "Logout", icon: faSignOutAlt, action: handleLogout },
  ];

  if (!user) return null;
  return (
    <>
      <SProfilePictureContainer>
        {user.photo_url ? (
          <SProfilePicture
            src={user.photo_url}
            alt={user.name}
            onClick={toggleMenuShowing}
          />
        ) : (
          <SProfileIcon
            icon={faUserCircle}
            onClick={toggleMenuShowing}
          />
        )}
        <SMenuContainer>
          <Menu
            actions={menuActions}
            toggleMenu={toggleMenuShowing}
            menuShowing={menuShowing}
          />
        </SMenuContainer>
      </SProfilePictureContainer>
      {settings && (
        <SettingsModal
          modalShowing={settingsModalShowing}
          toggleModal={toggleSettingsModal}
          currentSettings={settings}
        />
      )}
    </>
  );
};

const SProfilePictureContainer = styled.li`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SProfilePicture = styled.img`
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
`;

const SProfileIcon = styled(FontAwesomeIcon)`
  font-size: 2.7rem;
`;

const SMenuContainer = styled.div`
  position: absolute;
  top: 3.5rem;
  right: 11rem;

  ${theme.media.tabLand} {
    right: 12rem;
  }
`;

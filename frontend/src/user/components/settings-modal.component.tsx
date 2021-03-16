import React, { useEffect } from "react";

import { IUserSettings } from "../redux/user.types";
import { useForm } from "../../shared/hooks/use-form.hook";

// components
import { ModalWrapper } from "modal/components/modal-wrapper.component";
import { LabelCheckbox } from "../../shared/components/form/label-checkbox.component";

// styles
import { SHeadingSubtitle } from "../../shared/styles/typography.style";

interface IProps {
  currentSettings: IUserSettings;
  modalShowing: boolean;
  toggleModal: () => void;
}
export const SettingsModal: React.FC<IProps> = ({
  currentSettings,
  modalShowing,
  toggleModal,
}) => {
  const { values, handleChange, itemsChanged } = useForm<IUserSettings>(currentSettings);

  return (
    <ModalWrapper handleClose={toggleModal} isShowing={modalShowing}>
      <SHeadingSubtitle>Settings</SHeadingSubtitle>
      <form>
        <LabelCheckbox
          text="Show welcome modal"
          htmlFor="show-welcome"
          onChange={handleChange}
        />
      </form>
    </ModalWrapper>
  );
};

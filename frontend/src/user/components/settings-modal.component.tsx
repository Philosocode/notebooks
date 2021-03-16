import React from "react";

// components
import { ModalWrapper } from "modal/components/modal-wrapper.component";

// styles
import { SHeadingSubtitle } from "../../shared/styles/typography.style";
import { LabelCheckbox } from "../../shared/components/form/label-checkbox.component";
import { useForm } from "../../shared/hooks/use-form.hook";
import { IUserSettings } from "../redux/user.types";

interface IProps {
  currentSettings: IUserSettings;
  modalShowing: boolean;
  toggleModal: () => void;
}
export const SettingsModal: React.FC<IProps> = ({
  currentSettings,
  modalShowing,
  toggleModal
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

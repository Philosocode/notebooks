import React from "react";
import styled from "styled-components";

// logic
import { useForm } from "shared/hooks/use-form.hook";

// components
import { ModalWrapper } from "modal/components/modal-wrapper.component";
import { FormGroup } from "shared/components/form/form-group.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SButtonGreen } from "shared/styles/button.style";
import { SHeadingSubtitle } from "shared/styles/typography.style";

interface IProps {
  createEntity: (name: string) => void;
  handleClose: () => void;
  modalShowing: boolean;
}
export const CreatePartModal: React.FC<IProps> = ({
  createEntity,
  handleClose,
  modalShowing
}) => {
  const { values, handleChange } = useForm({ name: "" });
  const { name } = values;

  // derived state
  const buttonIsDisabled = name.trim() === "";

  // functions
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (buttonIsDisabled) return;

    createEntity(name);

    handleClose();
  }

  return (
    <ModalWrapper handleClose={handleClose} isShowing={modalShowing}>
      <div>
        <SHeadingSubtitle>Create Part</SHeadingSubtitle>
        <SForm autoComplete="off" onSubmit={handleSubmit}>
          <FormGroup
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="Part Name"
            value={name}
          />
          <SButton disabled={buttonIsDisabled}>Create</SButton>
        </SForm>
      </div>
    </ModalWrapper>
  );
}

const SForm = styled.form`
  margin-top: ${theme.spacing.base};
`;

const SButton = styled(SButtonGreen)`
  margin-top: ${theme.spacing.md};
`;
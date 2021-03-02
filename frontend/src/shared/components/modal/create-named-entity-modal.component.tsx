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
  children?: React.ReactNode;
  createEntity: (name: string) => void;
  entityName: string;
  handleClose: () => void;
  modalShowing: boolean;
}
export const CreateNamedEntityModal: React.FC<IProps> = ({
  children,
  createEntity,
  entityName,
  handleClose,
  modalShowing,
}) => {
  const { values, handleChange } = useForm({ name: "" });
  const { name } = values;

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
        <SHeadingSubtitle>Create {entityName}</SHeadingSubtitle>
        <SForm autoComplete="off" onSubmit={handleSubmit}>
          <FormGroup
            name="name"
            onChange={handleChange}
            type="text"
            placeholder={`${entityName} Name`}
            value={name}
          />
          {children}
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
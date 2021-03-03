import React from "react";
import styled from "styled-components";

// logic
import { useForm } from "shared/hooks/use-form.hook";
import { IModalProps } from "modal/redux/modal.types";

// components
import { FormGroup } from "shared/components/form/form-group.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SButtonGreen } from "shared/styles/button.style";
import { SHeadingSubtitle } from "shared/styles/typography.style";
import { ModalWrapper } from "../../../modal/components/modal-wrapper.component";

interface IProps extends IModalProps {
  createEntity: (name: string) => void;
  entityName: string;
  isShowing: boolean;
}
export const CreateNamedEntityModal: React.FC<IProps> = ({
  createEntity,
  entityName,
  handleClose,
  isShowing,
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
    <ModalWrapper isShowing={isShowing} handleClose={handleClose}>
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
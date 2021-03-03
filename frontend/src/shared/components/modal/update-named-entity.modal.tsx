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

interface IProps extends IModalProps {
  currentName: string;
  entityName: string;
  updateEntity: (name: string) => void;
}
export const UpdateNamedEntityModal: React.FC<IProps> = ({
  currentName,
  entityName,
  updateEntity,
  handleClose,
}) => {
  const { values, handleChange } = useForm({ name: currentName });
  const { name } = values;

  function buttonIsDisabled() {
    const lowerTrimmedName = name.trim().toLowerCase();

    return lowerTrimmedName === "" || lowerTrimmedName === currentName.toLowerCase();
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (buttonIsDisabled()) return;

    updateEntity(name);
    handleClose();
  }

  return (
    <div>
      <SHeadingSubtitle>Update {entityName}</SHeadingSubtitle>
      <SForm autoComplete="off" onSubmit={handleSubmit}>
        <FormGroup
          name="name"
          onChange={handleChange}
          type="text"
          placeholder={`${entityName} Name`}
          value={name}
        />
        <SButton disabled={buttonIsDisabled()}>Update</SButton>
      </SForm>
    </div>
  );
}

const SForm = styled.form`
  margin-top: ${theme.spacing.base};
`;

const SButton = styled(SButtonGreen)`
  margin-top: ${theme.spacing.md};
`;
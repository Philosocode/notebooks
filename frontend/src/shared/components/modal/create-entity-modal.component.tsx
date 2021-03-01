import React, { useState } from "react";
import styled from "styled-components";

// logic
import { IModalProps } from "modal/redux/modal.types";
import { useForm } from "shared/hooks/use-form.hook";

// components
import { FormGroup } from "shared/components/form/form-group.component";
import { TagAutocompleteInput } from "tag/components/tag-autocomplete-input.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SHeadingSubtitle } from "shared/styles/typography.style";
import { SButtonGreen } from "shared/styles/button.style";

interface IHasName {
  name: string;
}
interface IProps extends IModalProps {
  entities: IHasName[];
  entityName: string;
  entityTags: string[];
  createEntity: (name: string, tags: string[]) => void;
}
export const CreateEntityModal: React.FC<IProps> = ({
  entities,
  entityName,
  entityTags,
  createEntity,
  handleClose,
}) => {
  const [tagsToAdd, setTagsToAdd] = useState<string[]>([]);
  const { values, handleChange } = useForm({ name: "" });
  const { name } = values;
  const [submitted, setSubmitted] = useState(false);

  // derived state
  function buttonIsDisabled() {
    if (name.trim() === "") return true;

    return isDuplicate();
  }

  function isDuplicate() {
    return entities.some((e) => {
      return e.name.toLowerCase() === name.toLowerCase();
    });
  }

  function getError() {
    if (submitted) return;

    if (name.trim() !== "" && isDuplicate()) {
      return `${entityName} with that name already exists`;
    }
  }

  // functions
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // enter key shouldn't submit form
    // reason: user may want to enter tags
    // accidentally hitting enter will create the entity prematurely
    if (event.key === "Enter") event.preventDefault();
  };

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!name) return;

    createEntity(name, tagsToAdd);

    // dispatch(createMaterial({ name, tags: tagsToAdd }));

    setSubmitted(true);
    handleClose();
  }

  return (
    <SContent>
      <SHeadingSubtitle>Create {entityName}</SHeadingSubtitle>
      <SForm autoComplete="off" onSubmit={handleSubmit}>
        <FormGroup
          name="name"
          onChange={handleChange}
          type="text"
          placeholder={`${entityName} Name`}
          onKeyDown={handleKeyDown}
          value={name}
        />
        <SError>{getError()}</SError>
        <TagAutocompleteInput
          availableTags={entityTags}
          tagsToAdd={tagsToAdd}
          setTagsToAdd={setTagsToAdd}
        />
        <SButton disabled={buttonIsDisabled()}>Create</SButton>
      </SForm>
    </SContent>
  );
};

const SContent = styled.div``;

const SForm = styled.form`
  margin-top: ${theme.spacing.base};
`;

const SError = styled.p`
  color: ${theme.colors.red[300]};
  min-height: 3rem;
  margin-top: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.sm};
`;

const SButton = styled(SButtonGreen)`
  margin-top: ${theme.spacing.md};
`;

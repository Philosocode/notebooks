import React, { useState } from "react";
import styled from "styled-components";
import format from "date-fns/format";

// logic
import { IModalProps } from "modal/redux/modal.types";
import { useForm } from "shared/hooks/use-form.hook";

// components
import { FormGroup } from "shared/components/form/form-group.component";
import { TagAutocompleteInput } from "tag/components/tag-autocomplete-input.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SHeadingSubtitle } from "shared/styles/typography.style";
import { SButtonGreen, SButtonRed } from "shared/styles/button.style";

interface IEntityToUpdate {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  tags: string[];
}
interface IProps extends IModalProps {
  currentEntity: IEntityToUpdate;
  entities: IEntityToUpdate[];
  entityName: string;
  entityTags: string[];
  updateEntity: (name: string, tags: string[]) => void;
  deleteEntity: () => void;
}
export const UpdateEntityModal: React.FC<IProps> = ({
  currentEntity,
  entities,
  entityName,
  entityTags,
  updateEntity,
  deleteEntity,
  handleClose,
}) => {
  const [tagsToAdd, setTagsToAdd] = useState<string[]>(currentEntity.tags);
  const { values, handleChange } = useForm({ name: currentEntity.name });
  const { name } = values;
  const [submitted, setSubmitted] = useState(false);

  // derived state
  function buttonIsDisabled() {
    if (name.trim() === "") return true;

    return isDuplicate();
  }

  function isDuplicate() {
    return entities.some((e) => {
      if (currentEntity.name.toLowerCase() === e.name.toLowerCase()) return false;

      return e.name.toLowerCase() === name.toLowerCase();
    });
  }

  function getError() {
    if (currentEntity.name.toLowerCase() === name.toLowerCase()) return;
    if (submitted) return;

    if (name.trim() !== "" && isDuplicate()) {
      return `${entityName} with that name already exists`;
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // enter key shouldn't submit form
    // reason: user may want to enter tags
    // accidentally hitting enter will create the entity prematurely
    if (event.key === "Enter") event.preventDefault();
  };

  function handleDeleteClick(event: React.MouseEvent) {
    event.preventDefault();

    deleteEntity();
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!name) return;

    updateEntity(name, tagsToAdd);

    setSubmitted(true);
    handleClose();
  }

  const createdAtString = format(new Date(currentEntity.created_at), "PPP");
  const updatedAtString = format(new Date(currentEntity.updated_at), "PPP");

  return (
    <SContent>
      <SHeadingSubtitle>{currentEntity.name}</SHeadingSubtitle>
      <p>Created: {createdAtString}</p>
      <p>Last Updated: {updatedAtString}</p>

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
        <SButtons>
          <SUpdateButton disabled={buttonIsDisabled()}>Update</SUpdateButton>
          <SButtonRed onClick={handleDeleteClick}>Delete</SButtonRed>
        </SButtons>
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

const SButtons = styled.div`
  margin-top: ${theme.spacing.md};
`;

const SUpdateButton = styled(SButtonGreen)`
  margin-right: ${theme.spacing.base};
`;
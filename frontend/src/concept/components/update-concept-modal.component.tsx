import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// logic
import { IConcept } from "concept/redux/concept.types";
import { createConcept, updateConcept } from "concept/redux/concept.thunks";
import {
  selectConcepts,
  selectConceptTags,
} from "concept/redux/concept.selectors";
import { useForm } from "shared/hooks/use-form.hook";

// components
import { FormGroup } from "shared/components/form/form-group.component";
import { TagAutocompleteInput } from "tag/components/tag-autocomplete-input.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SHeadingSubtitle } from "shared/styles/typography.style";
import { SButtonGreen } from "shared/styles/button.style";
import { IModalProps } from "modal/redux/modal.types";

interface IProps extends IModalProps {
  concept?: IConcept;
}
export const CreateUpdateConceptModal: FC<IProps> = ({
  concept,
  handleClose,
}) => {
  // redux stuff
  const dispatch = useDispatch();
  const conceptTags = useSelector(selectConceptTags);
  const concepts = useSelector(selectConcepts);

  // component state
  const [tagsToAdd, setTagsToAdd] = useState<string[]>(concept?.tags ?? []);
  const { values, handleChange } = useForm({ name: concept?.name ?? "" });
  const { name } = values;
  const [submitted, setSubmitted] = useState(false);

  // derived state
  const isUpdate = concept !== undefined;

  function buttonIsDisabled() {
    if (name.trim() === "") return true;
    if (isDuplicateConcept()) return true;

    return false;
  }

  function isDuplicateConcept() {
    return concepts.some((c) => {
      // should be allowed to update a concept if name doesn't change
      if (concept?.name.toLowerCase() === c.name.toLowerCase()) return false;

      return c.name.toLowerCase() === name.toLowerCase();
    });
  }

  function getError() {
    if (concept && concept.name.toLowerCase() === name.toLowerCase()) return;
    if (submitted) return;

    if (name.trim() !== "" && isDuplicateConcept()) {
      return "Concept with that name already exists";
    }
  }

  // functions
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // enter key shouldn't submit form
    // reason: user may want to enter tags
    // accidentally hitting enter will create the concept prematurely
    if (event.key === "Enter") event.preventDefault();
  };

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!name) return;

    if (isUpdate) {
      dispatch(
        updateConcept({
          id: concept?.id as string,
          name,
          tags: tagsToAdd,
        })
      );
    } else {
      dispatch(createConcept({ name, tags: tagsToAdd }));
    }

    setSubmitted(true);
    handleClose();
  }

  return (
    <SContent>
      <SHeadingSubtitle>
        {isUpdate ? "Update" : "Create"} Concept
      </SHeadingSubtitle>
      <SForm autoComplete="off" onSubmit={handleSubmit}>
        <FormGroup
          name="name"
          onChange={handleChange}
          type="text"
          placeholder="Concept Name"
          onKeyDown={handleKeyDown}
          value={name}
        />
        <SError>{getError()}</SError>
        <TagAutocompleteInput
          availableTags={conceptTags}
          tagsToAdd={tagsToAdd}
          setTagsToAdd={setTagsToAdd}
        />
        <SButton disabled={buttonIsDisabled()}>
          {isUpdate ? "Update" : "Create"}
        </SButton>
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

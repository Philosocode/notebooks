import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import format from "date-fns/format";

// logic
import { IMaterial } from "../redux/material.types";
import { IModalProps } from "modal/redux/modal.types";
import { selectMaterials, selectMaterialTags } from "../redux/material.selectors";
import { useForm } from "shared/hooks/use-form.hook";
import { showModal } from "modal/redux/modal.slice";
import { updateMaterial } from "material/redux/material.thunks";

// components
import { FormGroup } from "shared/components/form/form-group.component";
import { TagAutocompleteInput } from "tag/components/tag-autocomplete-input.component";

// styles
import { theme } from "shared/styles/theme.style";
import { SHeadingSubtitle } from "shared/styles/typography.style";
import { SButtonGreen, SButtonRed } from "shared/styles/button.style";

interface IProps extends IModalProps {
  material: IMaterial;
}
export const UpdateMaterialModal: React.FC<IProps> = ({
  material,
  handleClose,
}) => {
  // redux stuff
  const dispatch = useDispatch();
  const materialTags = useSelector(selectMaterialTags);
  const materials = useSelector(selectMaterials);

  // component state
  const [tagsToAdd, setTagsToAdd] = useState<string[]>(material.tags);
  const { values, handleChange } = useForm({ name: material.name });
  const { name } = values;
  const [submitted, setSubmitted] = useState(false);

  // derived state
  function buttonIsDisabled() {
    if (name.trim() === "") return true;
    if (isDuplicateMaterial()) return true;

    return false;
  }

  function isDuplicateMaterial() {
    return materials.some((m) => {
      // should be allowed to update a concept if name doesn't change
      if (material.name.toLowerCase() === m.name.toLowerCase()) return false;

      return m.name.toLowerCase() === name.toLowerCase();
    });
  }

  function getError() {
    if (material.name.toLowerCase() === name.toLowerCase()) return;
    if (submitted) return;

    if (name.trim() !== "" && isDuplicateMaterial()) {
      return "Material with that name already exists";
    }
  }

  // functions
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    // enter key shouldn't submit form
    // reason: user may want to enter tags
    // accidentally hitting enter will create the concept prematurely
    if (event.key === "Enter") event.preventDefault();
  };

  function handleDeleteClick(event: React.MouseEvent) {
    event.preventDefault();

    dispatch(showModal({
      modalType: "delete-material",
      modalProps: { material }
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!name) return;

    dispatch(
      updateMaterial({
        id: material.id,
        name,
        tags: tagsToAdd,
      })
    );

    setSubmitted(true);
    handleClose();
  }

  const createdAtString = format(new Date(material.created_at), "PPP");
  const updatedAtString = format(new Date(material.updated_at), "PPP");

  return (
    <SContent>
      <SHeadingSubtitle>{material.name}</SHeadingSubtitle>
      <p>Created: {createdAtString}</p>
      <p>Last Updated: {updatedAtString}</p>

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
          availableTags={materialTags}
          tagsToAdd={tagsToAdd}
          setTagsToAdd={setTagsToAdd}
        />
        <SButtons>
          <SUpdateButton disabled={buttonIsDisabled()}>Update</SUpdateButton>
          <SButtonRed onClick={event => handleDeleteClick(event)}>Delete</SButtonRed>
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
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { IConcept } from "../redux/concept.types";
import { IModalProps } from "../../modal/redux/modal.types";
import { selectConcepts } from "concept/redux/concept.selectors";
import { useForm } from "shared/hooks/use-form.hook";
import { FormGroup } from "shared/components/form/form-group.component";
import { theme } from "shared/styles/theme.styles";
import { SHeadingSubtitle } from "shared/styles/typography.styles";
import { SButtonGreen } from "shared/styles/button.styles";
import { updateConcept } from "../redux/concept.thunks";

interface IProps extends IModalProps {
  concept: IConcept;
}

export const UpdateConcept: FC<IProps> = ({ concept, handleClose }) => {
  const originalName = concept.name;

  const { values, handleChange } = useForm({ newName: originalName });
  const { newName } = values;

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const concepts = useSelector(selectConcepts);

  // check if concept name is duplicate
  useEffect(() => {
    const newNameLower = newName.toLowerCase();

    // disable button if name unchanged or blank
    if (newName.trim() === "" || newNameLower === originalName.toLowerCase()) {
      setButtonDisabled(true);
      setError("");
      return;
    }

    const duplicateName = concepts.some(c => {
      return c.name.toLowerCase() !== originalName &&
             c.name.toLowerCase() === newNameLower;
    });

    if (duplicateName) {
      setButtonDisabled(true);
      setError("Concept with that name already exists.");
    } else {
      setButtonDisabled(false);
      setError("");
    }
  }, [originalName, newName, concepts]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newName) return;

    dispatch(updateConcept({ id: concept.id, name: newName }));
    handleClose();
  };

  return (
    <SContent>
      <SHeadingSubtitle>Update Concept</SHeadingSubtitle>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <FormGroup
          name="newName"
          onChange={handleChange}
          type="text"
          placeholder="Concept Name"
          value={newName}
        />
        <SError>{error}</SError>
        <SButtonGreen disabled={buttonDisabled}>Update</SButtonGreen>
      </form>
    </SContent>
  );
};

const SContent = styled.div`
  & * + * {
    margin-top: ${theme.spacing.base};
  }
`;

const SError = styled.p`
  color: ${theme.colors.red[300]};
`;
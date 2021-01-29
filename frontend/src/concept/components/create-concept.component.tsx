import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { createConcept } from "concept/redux/concept.thunks";
import { selectConcepts } from "concept/redux/concept.selectors";
import { useForm } from "shared/hooks/use-form.hook";
import { FormGroup } from "shared/components/form/form-group.component";
import { theme } from "shared/styles/theme.styles";
import { SHeadingSubtitle } from "shared/styles/typography.styles";
import { SButtonGreen } from "shared/styles/button.styles";
import { IModalProps } from "modal/redux/modal.types";

interface IProps extends IModalProps {}
export const CreateConcept: FC<IProps> = ({ handleClose }) => {
  const { values, handleChange } = useForm({ name: "" });
  const { name } = values;
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const concepts = useSelector(selectConcepts);

  // check if concept name is duplicate
  useEffect(() => {
    // disable button if name empty
    if (name.trim() === "") {
      setButtonDisabled(true);
      setError("");
      return;
    }

    const duplicateName = concepts.some(c => c.name.toLowerCase() === name.toLowerCase());

    if (duplicateName) {
      setButtonDisabled(true);
      setError("Concept with that name already exists.");
    } else {
      setButtonDisabled(false);
      setError("");
    }
  }, [name, concepts]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name) return;

    dispatch(createConcept(name));
    handleClose();
  }

  return (
    <SContent>
      <SHeadingSubtitle>Create Concept</SHeadingSubtitle>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <FormGroup
          name="name"
          onChange={handleChange}
          type="text"
          placeholder="Concept Name"
          value={name}
        />
        <SError>{error}</SError>
        <SButtonGreen disabled={buttonDisabled}>Create</SButtonGreen>
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
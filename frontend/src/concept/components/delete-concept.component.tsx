import React, { FC } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { IConcept } from "concept/redux/concept.types";
import { deleteConceptThunk } from "concept/redux/concept.thunks";
import { theme } from "shared/styles/theme.styles";
import { SHeadingSubtitle } from "shared/styles/typography.styles";
import { SButtonRed, SButton } from "shared/styles/button.styles";
import { trimString } from "shared/utils/string.utils";

interface IProps {
  concept: IConcept;
  handleClose: () => void;
}
export const DeleteConcept: FC<IProps> = ({ concept, handleClose }) => {
  const dispatch = useDispatch();
  const trimmedName = trimString(concept.name, 50);

  const handleDelete = () => {
    dispatch(deleteConceptThunk(concept.id));
    handleClose();
  }

  return (
    <SContent>
      <SHeadingSubtitle>Delete Concept</SHeadingSubtitle>
      <p>You are about to delete this concept: {trimmedName}</p>
      <SButtonRed onClick={handleDelete}>Delete Concept</SButtonRed>
      <SCancelButton onClick={handleClose}>Cancel</SCancelButton>
    </SContent>
  );
};

const SContent = styled.div`
  & * + * {
    margin-top: ${theme.spacing.base};
  }
`;

const SCancelButton = styled(SButton)`
  margin-left: 1.5em;
`;
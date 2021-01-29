import React, { FC } from "react";
import styled from "styled-components";

import { IConcept } from "concept/redux/concept.types";
import { theme } from "shared/styles/theme.styles";
import { IMenuAction, Menu } from "../../shared/components/menu.component";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { showModal } from "modal/redux/modal.slice";

interface IProps {
  concept: IConcept;
}

export const ConceptListItem: FC<IProps> = ({ concept }) => {
  const dispatch = useDispatch();

  function handleEdit() {
    dispatch(showModal({
      modalType: "update-concept",
      modalProps: { concept },
    }));
  }

  function handleDelete() {
    dispatch(showModal({
      modalType: "delete-concept",
      modalProps: { concept },
    }));
  }

  const menuActions: IMenuAction[] = [
    { action: handleEdit, name: "Edit Concept", icon: faPencilAlt },
    { action: handleDelete, name: "Delete Concept", icon: faTrash },
  ];

  return (
    <SContainer>
      <div>
        <SHeadingId>{[concept.id]}</SHeadingId>
        <SConceptName>{concept.name}</SConceptName>
      </div>
      <Menu actions={menuActions} />
    </SContainer>
  );
};

const SContainer = styled.li`
  border: 1px solid ${theme.colors.gray[200]};
  display: flex;
    justify-content: space-between;
  padding: ${theme.spacing.md};
  position: relative;
  width: 100%;
`;

const SHeadingId = styled.h4`
  color: ${theme.colors.gray[400]};
  font-size: ${theme.fontSizes.xs};
  font-weight: 400;
`;

const SConceptName = styled.h3`
  font-size: ${theme.fontSizes.md};
`;
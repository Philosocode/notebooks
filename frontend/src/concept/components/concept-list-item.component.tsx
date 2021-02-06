import React, { FC } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { IConcept } from "concept/redux/concept.types";
import { deleteTagFromConcept } from "../redux/concept.thunks";
import { showModal } from "modal/redux/modal.slice";
import { IMenuAction, Menu } from "../../shared/components/menu/menu.component";
import { TagPill } from "tag/components/tag-pill.component";
import { theme } from "shared/styles/theme.styles";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  concept: IConcept;
}

export const ConceptListItem: FC<IProps> = ({ concept }) => {
  const dispatch = useDispatch();

  function handleEdit() {
    dispatch(showModal({
      modalType: "create-update-concept",
      modalProps: { concept },
    }));
  }

  function handleDelete() {
    dispatch(showModal({
      modalType: "delete-concept",
      modalProps: { concept },
    }));
  }

  function handleDeleteTag(tag: string) {
    dispatch(deleteTagFromConcept({ tagName: tag, conceptId: concept.id }));
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
        <STagList>
          {
            concept.tags.map(t => <TagPill key={t} tag={t} handleDelete={() => handleDeleteTag(t)} />)
          }
        </STagList>
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

const STagList = styled.ul`
  list-style-type: none;
  display: flex;
`;
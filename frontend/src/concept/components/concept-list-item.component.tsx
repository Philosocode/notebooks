import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { IConcept } from "concept/redux/concept.types";
import { showModal } from "modal/redux/modal.slice";
import { deleteTagFromConcept } from "../redux/concept.thunks";

import { EntityListItem } from "../../shared/components/info/entity-list-item.component";

import { theme } from "shared/styles/theme.style";

interface IProps {
  concept: IConcept;
}
export const ConceptListItem: React.FC<IProps> = ({ concept }) => {
  const dispatch = useDispatch();

  function handleEdit() {
    dispatch(
      showModal({
        modalType: "update-concept",
        modalProps: { concept },
      })
    );
  }

  function handleDeleteTag(tag: string) {
    dispatch(deleteTagFromConcept({ tagName: tag, conceptId: concept.id }));
  }

  return (
    <EntityListItem
      entity={concept}
      link={`/concepts/${concept.id}`}
      updateEntity={handleEdit}
      deleteTag={handleDeleteTag}
    >
      <SNumHooks># Hooks: {concept.hooks?.length ?? concept.num_hooks}</SNumHooks>
    </EntityListItem>
  );
};

const SNumHooks = styled.p`
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  margin: 3px 0;
  letter-spacing: 1px;
  text-transform: uppercase;
`;
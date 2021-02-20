import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { IConcept } from "concept/redux/concept.types";
import { deleteTagFromConcept } from "../redux/concept.thunks";
import { showModal } from "modal/redux/modal.slice";
import { theme } from "shared/styles/theme.style";
import { TagList } from "tag/components/tag-list.component";

interface IProps {
  concept: IConcept;
}
export const ConceptListItem: FC<IProps> = ({ concept }) => {
  const dispatch = useDispatch();

  // event handlers
  function handleEdit(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

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
    <SContainer to={`/concepts/${concept.id}`}>
      <div>
        <SHeadingId>{[concept.id]}</SHeadingId>
        <SConceptName>{concept.name}</SConceptName>
        <SNumHooks># Hooks: {concept.hooks?.length ?? concept.num_hooks}</SNumHooks>
        <TagList tags={concept.tags} handleDeleteTag={handleDeleteTag} />
      </div>
      <SIcon icon="ellipsis-v" onClick={handleEdit} />
    </SContainer>
  );
};

const SContainer = styled(Link)`
  border: 1px solid ${theme.colors.gray[200]};
  display: flex;
  justify-content: space-between;
    align-items: center;
  padding: ${theme.spacing.md};
  position: relative;
  width: 100%;

  &:hover {
    background: ${theme.colors.offWhite};
  }
`;

const SHeadingId = styled.h4`
  color: ${theme.colors.gray[400]};
  font-size: ${theme.fontSizes.xs};
  font-weight: 400;
`;

const SConceptName = styled.h3`
  font-size: ${theme.fontSizes.md};
`;

const SNumHooks = styled.p`
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  margin: 3px 0;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const SIcon = styled(FontAwesomeIcon)`
  font-size: 2.6rem;
`;
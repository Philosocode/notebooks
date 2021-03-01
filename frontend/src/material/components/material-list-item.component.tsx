import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { IMaterial } from "material/redux/material.types";
import { showModal } from "modal/redux/modal.slice";
// import { deleteTagFromConcept } from "../redux/material.thunks";

import { TagList } from "tag/components/tag-list.component";

import { theme } from "shared/styles/theme.style";

interface IProps {
  material: IMaterial;
}
export const MaterialListItem: React.FC<IProps> = ({ material }) => {
  const dispatch = useDispatch();

  // event handlers
  function handleEdit(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    // dispatch(
    //   showModal({
    //     modalType: "update-concept",
    //     modalProps: { concept },
    //   })
    // );
  }

  function handleDeleteTag(tag: string) {
    // dispatch(deleteTagFromConcept({ tagName: tag, conceptId: concept.id }));
  }

  return (
    <SContainer to={`/materials/${material.id}`}>
      <div>
        <SHeadingId>{[material.id]}</SHeadingId>
        <SConceptName>{material.name}</SConceptName>
        <TagList tags={material.tags} handleDeleteTag={handleDeleteTag} />
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

const SIcon = styled(FontAwesomeIcon)`
  font-size: 2.6rem;
`;
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import format from "date-fns/format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IConcept } from "concept/redux/concept.types";
import { showModal } from "modal/redux/modal.slice";
import { deleteTagFromConcept } from "concept/redux/concept.thunks";
import { TagList } from "tag/components/tag-list.component";

import { SHeadingSubtitle } from "shared/styles/typography.style";
import { theme } from "shared/styles/theme.style";

interface IProps {
  concept: IConcept;
}
export const ConceptDetailHeader: FC<IProps> = ({ concept }) => {
  const dispatch = useDispatch();

  function showUpdateModal() {
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

  const formattedUpdateDate = format(new Date(concept.updated_at), "PPP");
  return (
    <SContainer>
      <SSettingsIcon icon="cog" onClick={showUpdateModal} />
      <SHeadingSubtitle>{concept.name}</SHeadingSubtitle>
      <p>Last Updated: {formattedUpdateDate}</p>
      <TagList tags={concept.tags} handleDeleteTag={handleDeleteTag} />
    </SContainer>
  );
};

const SContainer = styled.div`
  position: relative;
`;

const SSettingsIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 2rem;
  position: absolute;
  left: -2.75rem;
  top: 8px;
  transition:
    color ${theme.animations.transitionAppend},
    transform ${theme.animations.transitionAppend};

  &:hover {
    color: ${theme.colors.green[400]};
    transform: rotate(30deg);
  }
`;

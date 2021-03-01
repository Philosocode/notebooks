import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import format from "date-fns/format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// logic
import { IMaterial } from "material/redux/material.types";
import { showModal } from "modal/redux/modal.slice";
import { deleteTagFromConcept } from "concept/redux/concept.thunks";

// components
import { TagList } from "tag/components/tag-list.component";

// styles
import { SHeadingSubtitle } from "shared/styles/typography.style";
import { theme } from "shared/styles/theme.style";

interface IProps {
  name: string;
  updatedAt: string;
  tags: string[];
  handleDeleteTag: (tag: string) => void;
  showUpdateModal: () => void;
}
export const DetailHeader: React.FC<IProps> = ({
  name,
  updatedAt,
  tags,
  handleDeleteTag,
  showUpdateModal,
}) => {
  const formattedUpdateDate = format(new Date(updatedAt), "PPP");

  return (
    <SContainer>
      <SSettingsIcon icon="cog" onClick={showUpdateModal} />
      <SHeadingSubtitle>{name}</SHeadingSubtitle>
      <p>Last Updated: {formattedUpdateDate}</p>
      <TagList tags={tags} handleDeleteTag={handleDeleteTag} />
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

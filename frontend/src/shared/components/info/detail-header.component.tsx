import React from "react";
import styled from "styled-components";
import format from "date-fns/format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// styles
import { SHeadingSubtitle } from "shared/styles/typography.style";
import { theme } from "shared/styles/theme.style";

interface IProps {
  bottomSlot?: React.ReactNode;
  topSlot?: React.ReactNode;
  name: string;
  updatedAt: string;
  showUpdateModal: () => void;
}
export const DetailHeader: React.FC<IProps> = ({
  bottomSlot,
  topSlot,
  name,
  updatedAt,
  showUpdateModal,
}) => {
  const formattedUpdateDate = format(new Date(updatedAt), "PPP");

  return (
    <div>
      {topSlot}
      <STitleContainer>
        <SSettingsIcon icon="cog" onClick={showUpdateModal} />
        <SHeadingSubtitle>{name}</SHeadingSubtitle>
      </STitleContainer>
      <p>Last Updated: {formattedUpdateDate}</p>
      {bottomSlot}
    </div>
  );
};

const STitleContainer = styled.div`
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

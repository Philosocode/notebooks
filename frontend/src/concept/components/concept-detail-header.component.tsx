import React, { FC } from "react";
import styled from "styled-components";
import format from "date-fns/format";

import { IConcept } from "concept/redux/concept.types";
import { SHeadingSubtitle } from "shared/styles/typography.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "shared/styles/theme.style";

interface IProps {
  concept: IConcept;
}
export const ConceptDetailHeader: FC<IProps> = ({ concept }) => {
  const formattedUpdateDate = format(concept.updated_at, "PPP");
  return (
    <SContainer>
      <SSettingsIcon icon="cog" />
      <SHeadingSubtitle>{concept.name}</SHeadingSubtitle>
      <div>Last Updated: {formattedUpdateDate}</div>
    </SContainer>
  )
}

const SContainer = styled.div`
  position: relative;
`;

const SSettingsIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 2rem;
  position: absolute;
    left: -2.75rem;
    top: 8px;

  &:hover {
    color: ${theme.colors.green[400]};
  }
`;
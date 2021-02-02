import React, { FC } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { selectCurrConceptTag } from "concept/redux/concept.selectors";
import { theme } from "shared/styles/theme.styles";

interface IProps {
  tag: string;
  setCurrTag: (name: string) => void;
}
export const TagSidebarItem: FC<IProps> = ({ setCurrTag, tag }) => {
  const currTag = useSelector(selectCurrConceptTag);
  
  return (
    <SContainer onClick={() => setCurrTag(tag)} isActive={currTag === tag}>
      <SIcon icon="tag" />
      { tag }
    </SContainer>
  );
};


interface IContainerProps {
  isActive: boolean;
}
const SContainer = styled.li<IContainerProps>`
  ${p => p.isActive ? `background: ${theme.colors.gray[100]}` : null};
  cursor: pointer;
  display: flex;
    align-items: center;
  padding: ${theme.spacing.sm} ${theme.spacing.base};

  &:hover {
    background: ${theme.colors.gray[100]};
  }
`;

const SIcon = styled(FontAwesomeIcon)`
  color: ${theme.colors.gray[600]};
  margin-right: ${theme.spacing.sm};
`;
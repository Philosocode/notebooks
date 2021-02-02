import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { selectCurrConceptTag } from "concept/redux/concept.selectors";
import { setCurrConceptTag } from "concept/redux/concept.slice";
import { theme } from "shared/styles/theme.styles";

interface IProps {
  tag: string;
}
export const TagSidebarItem: FC<IProps> = ({ tag }) => {
  const dispatch = useDispatch();

  const currTag = useSelector(selectCurrConceptTag);

  const setCurrTag = () => {
    dispatch(setCurrConceptTag(tag));
  }
  
  return (
    <SContainer onClick={setCurrTag} isActive={currTag === tag}>
      <SIcon icon="tag" />
      { tag }
    </SContainer>
  );
};


interface IContainerProps {
  isActive: boolean;
}
const SContainer = styled.li<IContainerProps>`
  background: ${p => p.isActive && theme.colors.gray[100]};
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
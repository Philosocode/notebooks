import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../styles/theme.style";

interface IProps {
  linkUrl: string;
  name: string;
}
export const LinkGridItem: React.FC<IProps> = ({ linkUrl, name }) => {
  return (
    <SLink to={linkUrl}>
      <div>{name}</div>
    </SLink>
  );
};

const SLink = styled(Link)`
  background: ${theme.colors.offWhite};
  border-radius: 5px;
  box-shadow: ${theme.boxShadows.light};
  font-weight: 500;
  padding: ${theme.spacing.base};
  text-align: center;
  width: 100%;
  max-width: 25rem;
  margin: ${theme.spacing.base};
  
  &:hover {
    background: ${theme.colors.green[400]};
    color: ${theme.colors.white};
  }
`;

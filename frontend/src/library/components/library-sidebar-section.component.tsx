import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { ILibrarySection } from "../library.routes";
import { theme } from "shared/styles/theme.styles";
import { snakeCaseToTitleCase } from "../../shared/utils/string.utils";

interface IProps {
  section: ILibrarySection;
}

export const LibrarySidebarSection: FC<IProps> = ({ section }) => {
  return (
    <SSection>
      <SSectionHeading>{snakeCaseToTitleCase(section.name)}</SSectionHeading>
      <SPageList>
        {section.pages.map((pageName, idx) => (
          <SNavLink to={`/library/${pageName.toLowerCase()}`} key={pageName + idx}>
            {snakeCaseToTitleCase(pageName)}
          </SNavLink>
        ))}
      </SPageList>
    </SSection>
  );
};

const SSection = styled.div`
  &:not(:first-child) {
    margin-top: ${theme.spacing.base};
  }
`;

const SSectionHeading = styled.h2`
  font-size: ${theme.fontSizes.md};
`;

const SPageList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
`;

const SNavLink = styled(NavLink).attrs({
  activeClassName: "active",
})`
  color: black;
  margin-top: 5px;
  width: max-content;

  &.active {
    color: ${theme.colors.green};
    font-weight: bold;
  }
`;

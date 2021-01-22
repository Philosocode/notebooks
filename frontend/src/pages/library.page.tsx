import React from "react";
import styled from "styled-components";

import { SHeadingTitle } from "shared/styles/typography.styles";
import { theme } from "shared/styles/theme.styles";

export const LibraryPage = () => {
  return (
    <SLibraryPageContent>
      <SHeadingTitle>Library Page</SHeadingTitle>
    </SLibraryPageContent>
  );
};

const SLibraryPageContent = styled.div`
  max-width: 100rem;
  margin: 0 auto;
  padding-top: ${theme.spacing.base}
`;
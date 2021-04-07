import React from 'react';
import styled from "styled-components";

import { theme } from "shared/styles/theme.style";

export const SidebarFooter = () => {
  return (
    <SFooter>
      <p>&copy; 2020 - Tam Le</p>
    </SFooter>
  );
};

const SFooter = styled.footer`
  font-size: ${theme.fontSizes.sm};
  margin-top: ${theme.spacing.lg};
`;
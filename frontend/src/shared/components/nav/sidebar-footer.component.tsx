import React from 'react'
import styled from "styled-components"

import { theme } from "shared/styles/theme.styles";

export const SidebarFooter = () => {
  return (
    <SFooter>
      <p>&copy; 2020</p>
      <SFooterLinks>
        <span>Privacy Policy</span>
        <span>Terms of Use</span>
      </SFooterLinks>
    </SFooter>
  )
}

const SFooter = styled.footer`
  font-size: ${theme.fontSizes.sm};
  margin-top: ${theme.spacing.lg};
`;

const SFooterLinks = styled.span`
  display: flex;
    justify-content: space-between;
`;
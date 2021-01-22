import React from 'react'
import styled from "styled-components";

import { theme } from "shared/styles/theme.styles";

export const Sidebar = () => {
  return (
    <SAside className="sidebar">
    </SAside>
  )
}

const SAside = styled.aside`
  background: #ddd;
  display: block;
  position: fixed;
  left: 0;
  height: 100vh;
  width: ${theme.other.sidebarWidth};
`;
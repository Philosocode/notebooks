import React from "react";
import styled from "styled-components";

import { theme } from "shared/styles/theme.styles";
import { sections } from "library/library.routes";
import { LibrarySidebarSection } from "../../library/components/library-sidebar-section.component";
import { SidebarFooter } from "./nav/sidebar-footer.component";

export const Sidebar = () => {
  return (
    <SSidebar>
      {sections.map((section, idx) => (
        <LibrarySidebarSection section={section} key={section.name + idx} />
      ))}
      <SidebarFooter />
    </SSidebar>
  );
};

const SSidebar = styled.aside`
  background: #ddd;
  display: block;
  height: 100vh;
  width: ${theme.other.sidebarWidth};
  padding: ${theme.spacing.base};
  padding-bottom: ${theme.spacing.lg};
  position: fixed;
  top: ${theme.other.navbarHeight};
  left: 0;
  overflow-y: auto;
`;

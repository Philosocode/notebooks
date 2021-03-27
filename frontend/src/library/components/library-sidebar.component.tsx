import React from "react";
import styled from "styled-components";

import { sections } from "../config/library-routes.config";
import { theme } from "shared/styles/theme.style";

import { LibrarySidebarSection } from "./library-sidebar-section.component";
import { SidebarFooter } from "shared/components/nav/sidebar-footer.component";

export const LibrarySidebar: React.FC = () => {
  return (
    <SContent>
      {
        sections.map((section, idx) => (
          <LibrarySidebarSection section={section} key={section.name + idx} />
        ))
      }
      <SidebarFooter />
    </SContent>
  )
};

const SContent = styled.div`
  padding: ${theme.spacing.base};
`;
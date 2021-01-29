import React, { FC } from "react";

import { sections } from "../config/library-routes.config";
import { theme } from "shared/styles/theme.styles";

import { LibrarySidebarSection } from "./library-sidebar-section.component";
import { SidebarWrapper } from "shared/components/nav/sidebar-wrapper.component";
import { SidebarFooter } from "shared/components/nav/sidebar-footer.component";
import styled from "styled-components";

export const LibrarySidebar: FC = () => (
  <SidebarWrapper width={theme.componentSizes.librarySidebarWidth}>
    <SContent>
      {
        sections.map((section, idx) => (
          <LibrarySidebarSection section={section} key={section.name + idx}/>
        ))
      }
      <SidebarFooter />
    </SContent>
  </SidebarWrapper>
);

const SContent = styled.div`
  padding: ${theme.spacing.base};
`;
import React, { FC } from "react";
import styled from "styled-components";

import { ILibrarySection, sections } from "../library.routes";
import { LibrarySidebarSection } from "./library-sidebar-section.component";
import { Sidebar } from "../../shared/components/nav/sidebar.component";

export const LibrarySidebar: FC = () => (
  <Sidebar>
    {
      sections.map((section, idx) => (
        <LibrarySidebarSection section={section} key={section.name + idx}/>
      ))
    }
  </Sidebar>
);
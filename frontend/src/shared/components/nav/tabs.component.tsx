import React, { useState } from "react";
import { theme } from "shared/styles/theme.style";
import styled from "styled-components";

import { TabTitle } from "./tab-title.component";

type Props = {
  children: React.ReactElement[];
};
// FROM: https://medium.com/weekly-webtips/create-basic-tabs-component-react-typescript-231a2327f7b6
export const Tabs: React.FC<Props> = ({ children }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <div>
      <STabList>
        {/*
          - children: list of <Tab />s
          - need to pass a `title` prop into <Tab /> 
            so it can be put in the tab title
          - need to pass `index` so the tab title can set the current active tab
        */}
        {children.map((child, index) => (
          <TabTitle
            key={index}
            index={index}
            selectedTabIndex={selectedTabIndex}
            title={child.props.title}
            setSelectedTab={setSelectedTabIndex} 
          />
        ))}
      </STabList>
      {/* only show the child that matches the selectedTabIndex */}
      {children[selectedTabIndex]}
    </div>
  );
};

const STabList = styled.ul`
  display: flex;
  margin-top: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.base};
`;
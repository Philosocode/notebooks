import React from "react";
import { theme } from "shared/styles/theme.style";
import styled from "styled-components";

import { TabTitle } from "./tab-title.component";

interface IProps {
  tabNames: string[];
  selectedTab: string;
  setSelectedTab: (tabName: string) => void;
}
// FROM: https://medium.com/weekly-webtips/create-basic-tabs-component-react-typescript-231a2327f7b6
export const TabNames: React.FC<IProps> = ({ tabNames, selectedTab, setSelectedTab }) => {
  return (
    <div>
      <STabList>
        {tabNames.map(tabName => (
          <TabTitle
            key={tabName}
            title={tabName}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </STabList>
    </div>
  );
};

const STabList = styled.ul`
  display: flex;
  margin-top: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.base};
`;
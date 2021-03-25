import React, { FC } from "react";
import styled from "styled-components";

import { theme } from "shared/styles/theme.style";

interface IProps {
  width: string;
}

export const SidebarWrapper: FC<IProps> = ({ children, width }) => {
  return <SSidebar width={width}>{children}</SSidebar>;
};

const SSidebar = styled.aside`
  background: #eee;
  max-height: 100vh;
  padding-bottom: ${theme.spacing.md};
  padding-top: ${theme.componentSizes.navbarHeight};
  overflow-y: auto;
  min-width: ${(props: IProps) => props.width};
`;

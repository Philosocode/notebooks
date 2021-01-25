import React, { FC } from "react";
import styled from "styled-components";

import { theme } from "shared/styles/theme.styles";

interface IProps {
  width: string;
}

export const SidebarWrapper: FC<IProps> = ({
  children,
  width
}) => {
  return (
    <SSidebar width={width}>
      {children}
    </SSidebar>
  );
};

const SSidebar = styled.aside`
  background: #eee;
  display: block;
  height: 100vh;
  width: ${(props: IProps) => props.width};
  padding-bottom: ${theme.spacing.lg};
  position: fixed;
    top: ${theme.componentSizes.navbarHeight};
    left: 0;
  overflow-y: auto;
`;

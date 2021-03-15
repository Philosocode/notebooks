import React, { FC, MutableRefObject, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styled from "styled-components";

import { theme } from "shared/styles/theme.style";
import { OptionIcon } from "shared/components/button/option-icon.component";
import { useToggle } from "../../shared/hooks/use-toggle.hook";

export interface IMenuAction {
  action: any;
  name: string;
  icon: IconProp;
}
interface IProps {
}
// Referenced: https://letsbuildui.dev/articles/building-a-dropdown-menu-component-with-react-hooks
export const PartListItemMenu: FC<IProps> = () => {


  return (
    <div>

    </div>
  );
};

const SContainer = styled.div`
  display: flex;
    align-items: center;
  position: relative;
  width: max-content;
`;

const SActionList = styled.div`
  border: 1px solid ${theme.colors.gray[100]};
  border-top: none;
  display: flex;
  flex-direction: column;
  position: absolute;
    right: 1.5rem;
    top: 1rem;
  width: max-content;
`;

const SAction = styled.button`
  border: 1px solid ${theme.colors.gray[200]};
  cursor: pointer;
  text-align: left;
  padding: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colors.gray[200]};
  }

  &:active,
  &:focus {
    outline: 1px solid ${theme.colors.gray[200]};
  }
`;

const SActionIcon = styled(FontAwesomeIcon)`
  margin-right: ${theme.spacing.sm};
`;
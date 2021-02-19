import React from "react";
import styled from "styled-components";
import { faCompress, faExpand } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// styles
import { theme } from "shared/styles/theme.style";
import { SButton } from "shared/styles/button.style";
import { SInputBorderless } from "shared/styles/form.style";

interface IProps {
  hasExpandedHook: boolean;
  toggleExpand: () => void;
}
export const HookListControls: React.FC<IProps> = ({
  hasExpandedHook,
  toggleExpand,
}) => {
  return (
    <>
      <SSortButtons>
        <SSortButton>
          A-Z <SSortIcon icon="caret-down" />
        </SSortButton>
        <SSortButton>
          Created <SSortIcon icon="caret-down" />
        </SSortButton>
        <SSortButton>
          Updated <SSortIcon icon="caret-down" />
        </SSortButton>
      </SSortButtons>
    </>
  );
};



const SSortIcon = styled(FontAwesomeIcon)`
  font-size: 1.8rem;
  margin-left: ${theme.spacing.xs};
`;

const SSortButtons = styled.div`
  margin-top: ${theme.spacing.sm};
`;

const SSortButton = styled.button`
  border: none;
  cursor: pointer;
  margin-left: ${theme.spacing.xs};
  margin-right: ${theme.spacing.xs};
  padding: ${theme.spacing.xs};
  width: 12rem;
`;

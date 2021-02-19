import React from "react";
import styled from "styled-components";
import { faCompress, faExpand } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// styles
import { theme } from "../../shared/styles/theme.style";
import { SButton } from "../../shared/styles/button.style";

interface IProps {
  hasExpandedHook: boolean;
  toggleExpand: () => void;
}
export const HookListControls: React.FC<IProps> = ({
  hasExpandedHook,
  toggleExpand,
}) => {
  return (
    <SControls>
      <SExpandButton onClick={toggleExpand}>
        <SIcon icon={hasExpandedHook ? faCompress : faExpand} />
        { hasExpandedHook ? "Collapse All" : "Expand All" }
      </SExpandButton>
    </SControls>
  );
};

const SControls = styled.div`
  margin-top: ${theme.spacing.base};
`;

const SIcon = styled(FontAwesomeIcon)`
  margin-right: ${theme.spacing.sm};
`;

const SExpandButton = styled(SButton)`
  box-shadow: none;
`;

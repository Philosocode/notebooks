import React, { FC } from "react";
import styled from "styled-components";

import { IConcept } from "concept/redux/concept.types";
import { theme } from "shared/styles/theme.styles";
import { IMenuAction, Menu } from "../../shared/components/menu.component";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  concept: IConcept;
}

const menuActions: IMenuAction[] = [
  { action: () => console.log("Edit"), name: "Edit Concept", icon: faPencilAlt },
  { action: () => console.log("Delete"), name: "Delete Concept", icon: faTrash },
];

export const ConceptListItem: FC<IProps> = ({ concept }) => {
  return (
    <SContainer>
      <div>
        <SHeadingId>{[concept.id]}</SHeadingId>
        <SConceptName>{concept.name}</SConceptName>
      </div>
      <Menu actions={menuActions} />
    </SContainer>
  );
};

const SContainer = styled.li`
  border: 1px solid ${theme.colors.gray[200]};
  display: flex;
    justify-content: space-between;
  padding: ${theme.spacing.md};
  position: relative;
  width: 100%;
`;

const SHeadingId = styled.h4`
  color: ${theme.colors.gray[400]};
  font-size: ${theme.fontSizes.xs};
  font-weight: 400;
`;

const SConceptName = styled.h3`
  font-size: ${theme.fontSizes.md};
`;
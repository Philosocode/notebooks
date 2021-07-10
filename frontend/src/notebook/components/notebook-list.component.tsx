import React from "react";
import styled from "styled-components";

import { INotebook } from "../redux/notebook.types";
import { NotebookListItem } from "./notebook-list-item.component";
import { theme } from "../../shared/styles/theme.style";

interface IProps {
  notebooks: INotebook[];
}
export const NotebookList: React.FC<IProps> = ({ notebooks }) => {
  return (
    <SNotebookList>
      {notebooks.map((notebook) => (
        <NotebookListItem notebook={notebook} key={notebook.id} />
      ))}
    </SNotebookList>
  );
};

const SNotebookList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding-bottom: ${theme.spacing.listBottomPadding};
`;

import { ISection } from "section/redux/section.types";

export interface INotebook {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  tags: string[];
  sectionIds?: string[];
}

export interface INotebookHash {
  [key: string]: INotebook;
}

export interface INotebookState {
  notebooks: INotebookHash;
  currentNotebookId?: string;
}
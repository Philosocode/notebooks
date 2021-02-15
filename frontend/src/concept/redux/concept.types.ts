import { IEntityFilter } from "shared/types.shared";

export interface IConcept {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  tags: string[];
  links: string[];
}

export interface IConceptFiltersState extends IEntityFilter {}

export interface IConceptState {
  concepts: IConcept[];
  currentConcept?: IConcept;
  filters: IConceptFiltersState;
}

export interface ICreateConceptPayload {
  name: string;
}
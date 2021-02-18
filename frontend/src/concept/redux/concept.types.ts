import { IEntityFilter } from "shared/types.shared";
import { IHook } from "hook/redux/hook.types";

export interface IConcept {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  tags: string[];
  links: string[];
  hooks?: IHook[];
}

export interface IConceptFiltersState extends IEntityFilter {}

export interface IConceptState {
  concepts: IConcept[];
  currentConceptId?: string;
  filters: IConceptFiltersState;
}
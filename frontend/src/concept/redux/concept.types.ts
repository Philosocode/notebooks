import { IEntityFilter } from "shared/types.shared";
import { IHook } from "hook/redux/hook.types";

export interface IConcept {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  tags: string[];
  num_hooks: number;
  hooks?: IHook[];
  links?: IConceptLink[];
}

export interface IConceptFiltersState extends IEntityFilter {}

export interface IConceptHash {
  [key: string]: IConcept;
}

export interface IConceptState {
  concepts: IConceptHash;
  currentConceptId?: string;
  filters: IConceptFiltersState;
}

export interface IConceptLink {
  id: string;
  concept_id: string;
}

export interface IConceptLinkWithName extends IConceptLink {
  concept_name: string;
  updated_at: string;
  created_at: string;
}

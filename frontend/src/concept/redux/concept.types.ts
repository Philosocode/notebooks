export interface IConcept {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  tags: string[];
  num_hooks: number;
  hookIds?: string[];
  links?: IConceptConceptLink[];
}

export interface IConceptHash {
  [key: string]: IConcept;
}

export interface IConceptState {
  concepts: IConceptHash;
  currentConceptId?: string;
}

export interface IConceptConceptLink {
  id: string;
  concept_id: string;
}

export interface IConceptConceptLinkWithName extends IConceptConceptLink {
  concept_name: string;
  updated_at: string;
  created_at: string;
}

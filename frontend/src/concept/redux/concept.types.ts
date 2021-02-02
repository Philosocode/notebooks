export interface IConcept {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  tags: Set<string>;
  links: Set<string>;
}

export interface IConceptState {
  concepts: IConcept[];
  currConcept?: IConcept;
  currTag?: string;
}

export interface ICreateConceptPayload {
  name: string;
}
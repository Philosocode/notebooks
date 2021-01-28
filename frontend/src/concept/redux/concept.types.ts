export interface IConcept {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
}

export interface IConceptState {
  concepts?: IConcept[];
  currConcept?: IConcept;
}

export interface ICreateConceptPayload {
  name: string;
}
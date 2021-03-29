export interface IFact {
  id: string;
  question: string;
  answer: string;
  mastered: boolean;
  part_id: string;
  part_name: string;
}

// SEE: https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
export interface IFactState {
  facts: {
    [key: string]: IFact;
  };
}
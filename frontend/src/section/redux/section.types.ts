export interface ISection {
  id: string;
  name: string;
  content: string;
  created_at: string;
  updated_at: string;
  part_id: string;
}

// SEE: https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
export interface ISectionState {
  sections: {
    [key: string]: ISection;
  };
}
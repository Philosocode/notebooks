export interface INote {
  id: string;
  name: string;
  content: string;
  created_at: string;
  updated_at: string;
  section_id: string;
}

// SEE: https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
export interface INoteState {
  notes: {
    [key: string]: INote;
  };
}
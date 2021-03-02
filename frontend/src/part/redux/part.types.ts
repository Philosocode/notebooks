export interface IPart {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

// SEE: https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
export interface IPartState {
  parts: {
    [key: string]: IPart;
  };
  currentPart?: IPart;
}
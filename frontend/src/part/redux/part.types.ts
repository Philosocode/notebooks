export interface IPart {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  checklist: IPartChecklist;
  sections?: string[];
  material_id: string;
}

// SEE: https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
export interface IPartState {
  parts: {
    [key: string]: IPart;
  };
  currentPartId?: string;
}

export interface IPartChecklist {
  [key: string]: boolean;
}
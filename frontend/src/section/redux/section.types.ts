export interface ISection {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  checklist: ISectionChecklist;
  noteIds?: string[];
  flashcardIds?: string[];
  conceptIds?: string[];
  notebook_id: string;
}

// SEE: https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
export interface ISectionState {
  sections: {
    [key: string]: ISection;
  };
  currentSectionId?: string;
}

export interface ISectionChecklist {
  [key: string]: boolean;
}
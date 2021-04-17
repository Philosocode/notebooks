export interface IFlashcard {
  id: string;
  question: string;
  answer: string;
  mastered: boolean;
  section_id: string;
  section_name: string;
}

// SEE: https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
export interface IFlashcardState {
  flashcards: {
    [key: string]: IFlashcard;
  };
}
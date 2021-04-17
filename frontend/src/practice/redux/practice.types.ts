export type TFlashcardSource = "all" | "notebook" | "section";

export interface IPracticeState {
  id: string;
  source: TFlashcardSource;
}
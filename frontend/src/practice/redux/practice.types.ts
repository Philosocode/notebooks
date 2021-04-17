export type TFlashcardSource = "all" | "material" | "section";

export interface IPracticeState {
  id: string;
  source: TFlashcardSource;
}
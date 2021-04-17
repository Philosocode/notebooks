export type TFactSource = "all" | "material" | "section";

export interface IPracticeState {
  id: string;
  source: TFactSource;
}
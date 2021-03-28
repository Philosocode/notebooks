export type TFactSource = "all" | "material" | "part";

export interface IPracticeState {
  id: string;
  source: TFactSource;
}
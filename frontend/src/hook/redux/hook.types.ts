export type THookType = "connect" | "memorize" | "process";

export interface IHook {
  content: string;
  created_at: string;
  updated_at: string;
  id: string;
  position: number;
  title: string;
};

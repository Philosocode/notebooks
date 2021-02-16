export type THookType = "connect" | "memorize" | "process";

export interface IDefaultHook {
  title: string;
  type: THookType;
}
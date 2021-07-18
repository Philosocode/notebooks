export type THookType = "common" | "connect" | "memorize" | "process";

export interface IHook {
  content: string;
  created_at: string;
  updated_at: string;
  id: string;
  name: string;
}

export interface IHookState {
  hooks: {
    [key: string]: IHook;
  }
}
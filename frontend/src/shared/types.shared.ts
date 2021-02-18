export type TResStatus = "success" | "failure";

export interface IEntityFilter {
  isUncategorized: boolean;
  tag: string;
}

export interface IRepositionEntityPayload {
  ownerEntityId: string;
  oldIndex: number;
  newIndex: number;
}
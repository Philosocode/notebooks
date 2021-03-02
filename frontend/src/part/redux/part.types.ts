export interface IPart {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface IPartState {
  parts: IPart[];
  currentPart?: IPart;
}
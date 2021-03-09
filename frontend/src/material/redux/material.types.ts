import { IPart } from "part/redux/part.types";

export interface IMaterial {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  tags: string[];
  partIds?: string[];
}

export interface IMaterialHash {
  [key: string]: IMaterial;
}

export interface IMaterialState {
  materials: IMaterialHash;
  currentMaterialId?: string;
}
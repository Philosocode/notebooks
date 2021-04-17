import { ISection } from "section/redux/section.types";

export interface IMaterial {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  tags: string[];
  sectionIds?: string[];
}

export interface IMaterialHash {
  [key: string]: IMaterial;
}

export interface IMaterialState {
  materials: IMaterialHash;
  currentMaterialId?: string;
}
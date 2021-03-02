export interface IMaterial {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  tags: string[];
}

export interface IMaterialState {
  materials: IMaterial[];
  currentMaterialId?: string;
  partIds: string[];
}
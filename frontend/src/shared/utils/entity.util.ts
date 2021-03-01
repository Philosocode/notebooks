interface IHasId {
  id: string;
}
export function getEntityIndex(entities: IHasId[], entityId: string) {
  return entities.findIndex((e) => e.id === entityId);
}
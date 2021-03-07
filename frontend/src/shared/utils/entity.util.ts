interface IHasId {
  id: string;
}
export function getEntityIndex(entities: IHasId[], entityId: string) {
  return entities.findIndex((e) => e.id === entityId);
}

// SEE: https://stackoverflow.com/a/52189084/9970553
export function sortEntitiesByKey<
  T extends Record<K, string>,
  K extends keyof any
>(entities: T[], key: K) {
  return entities.sort((a,b) => {
    if (a[key] === b[key]) return 0;
    if (a[key] < b[key]) return -1;

    return 1;
  });
}
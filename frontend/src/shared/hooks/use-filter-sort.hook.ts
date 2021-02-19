import { useState } from "react";

export function useFilterSort<TEntityType>(
  entities: any[],
  filterKey: string,
  filterText: string,
) {
  const filteredEntities: TEntityType[] = entities.filter(entity => {
    return entity[filterKey].toLowerCase().includes(filterText.trim().toLowerCase())
  });

  return {
    filteredEntities,
  }
}
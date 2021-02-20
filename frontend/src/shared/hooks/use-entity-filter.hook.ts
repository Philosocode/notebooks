import { useState } from "react";

export function useEntityFilter<TEntityType>(
  entities: any[],
  filterKey: string,
) {
  const [filterText, setFilterText] = useState("");

  const filteredEntities: TEntityType[] = entities.filter(entity => {
    return entity[filterKey].toLowerCase().includes(filterText.trim().toLowerCase())
  });

  return {
    filteredEntities,
    filterText,
    setFilterText,
  };
}
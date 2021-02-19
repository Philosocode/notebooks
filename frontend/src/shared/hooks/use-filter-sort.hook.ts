import { useState } from "react";

interface IEntity {
  [key: string]: any;
}
export function useFilterSort(
  entities: IEntity[],
  filterKey: string
) {
  const [filterText, setFilterText] = useState("");

  const filteredEntities = entities.filter(
    entity => entity[filterKey].toLowerCase().includes(filterText.trim().toLowerCase())
  );

  return {
    filteredEntities,
  }
}
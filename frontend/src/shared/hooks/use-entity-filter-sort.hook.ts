import { useCallback, useEffect, useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import orderBy from "lodash/orderBy";


type TSortMode = "alphabetical" | "created" | "updated" | "custom";
type TSortDirection = "asc" | "desc";

export function useEntityFilterSort<TEntity>(
  entities: any[],
  filterKey: string,
) {
  const [filteredEntities, setFilteredEntities] = useState<TEntity[]>(entities);
  const [filterText, setFilterText] = useState("");

  const [sortMode, setSortMode] = useState<TSortMode>("custom");
  const [sortDirection, setSortDirection] = useState<TSortDirection>("asc");

  useEffect(() => {
    if (filterText.trim() === "") {
      setFilteredEntities(entities);
    } else {
      setFilteredEntities(
        entities.filter(entity =>
          entity[filterKey].toLowerCase().includes(filterText.trim().toLowerCase())
        )
      );
    }
  }, [entities, filterText]);

  useEffect(() => {
    if (sortMode === "custom") return;

    let sortKey = filterKey;
    if (sortMode === "created") sortKey = "created_at";
    else if (sortMode === "updated") sortKey = "updated_at";

    setFilteredEntities(previousEntities => {
      return orderBy(previousEntities, [sortKey], sortDirection);
    });
  }, [sortMode, sortDirection, entities]);

  function getSortIconCaret(mode: TSortMode): IconProp {
    if (mode !== sortMode || sortDirection === "desc") return "caret-down";

    // ascending
    return "caret-up";
  }

  function handleSortClick(mode: TSortMode) {
    if (mode !== sortMode) {
      // click on different mode -> change mode, set direction to ascending
      setSortMode(mode);
      setSortDirection("asc");
    }
    else {
      // click on same mode -> toggle direction
      toggleSortDirection();
    }
  }

  function toggleSortDirection() {
    setSortDirection(prevDirection => {
      if (prevDirection === "asc") return "desc";
      return "asc";
    });
  }

  return {
    filteredEntities,
    filterText,
    setFilterText,
    sortMode,
    setSortMode,
    getSortIconCaret,
    handleSortClick,
  }
}
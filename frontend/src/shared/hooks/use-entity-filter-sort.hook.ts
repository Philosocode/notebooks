import { useEffect, useState } from "react";
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
  }, [entities, filterKey, filterText]);

  useEffect(() => {
    if (sortMode === "custom") {
      // reset to default order
      return setFilteredEntities(entities);
    }

    let sortKey = filterKey;
    let direction = sortDirection;
    if (sortMode === "created") sortKey = "created_at";
    else if (sortMode === "updated") {
      sortKey = "updated_at";

      // need to flip the direction around for last updated sort
      direction = (sortDirection === "asc")
        ? "desc" : "asc";
    }

    setFilteredEntities(previousEntities => {
      return orderBy(previousEntities, [sortKey], direction);
    });
  }, [entities, filterKey, sortMode, sortDirection]);

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
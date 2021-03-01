import { useState } from "react";

export function useTagFilter() {
  const [isUncategorized, setIsUncategorized] = useState(false);
  const [currentTag, setCurrentTag] = useState("");

  function handleSetCurrentTag(tag: string) {
    /*
     * set tag if:
     * - clicking on uncategorized -> all
     * - tag to set not equal to current tag
     */
    if (
      (isUncategorized && currentTag === "") ||
      (tag !== currentTag)
    ) {
      setIsUncategorized(false);
      setCurrentTag(tag);
    }
  }

  // needs to accept a string to work with TagSidebarItem
  function handleSetIsUncategorized(_: string) {
    setIsUncategorized(true);
  }

  return {
    currentTag,
    setCurrentTag: handleSetCurrentTag,
    isUncategorized,
    setIsUncategorized: handleSetIsUncategorized,
  }
}
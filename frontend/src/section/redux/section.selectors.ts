import { createSelector } from "@reduxjs/toolkit";

import { TAppState } from "shared/redux/store";
import { selectCurrentPartId } from "part/redux/part.selectors";
import { ISection } from "./section.types";

const selectSectionState = (state: TAppState) => state.section;

export const selectSectionHash = createSelector(
  [selectSectionState],
  (state) => state.sections,
);

export const selectSectionsForPart = createSelector(
  [selectSectionHash, selectCurrentPartId],
  (sectionHash, currentPartId) => {
    if (!currentPartId) return;

    const sections: ISection[] = [];

    Object.keys(sectionHash).forEach(sectionId => {
      const section = sectionHash[sectionId];
      if (section.part_id === currentPartId) sections.push(section);
    });

    return sections;
  }
)
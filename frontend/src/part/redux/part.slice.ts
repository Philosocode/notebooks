import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createPart, deletePart, getPart, getParts, updatePart, updatePartChecklist } from "./part.thunks";
import omit from "lodash/omit";

import { IPartState } from "./part.types";
import { createSection, deleteSection, getSections } from "../../section/redux/section.thunks";
import { IRepositionEntityPayload } from "../../shared/types.shared";
import { createConceptPart, deleteConceptPart, getConceptParts } from "../../concept-link/redux/concept-link.thunks";

const initialState: IPartState  = {
  parts: {},
  currentPartId: undefined,
};

const partSlice = createSlice({
  name: "part",
  initialState,
  reducers: {
    setCurrentPartId: (state, action: PayloadAction<string>) => {
      state.currentPartId = action.payload;
    },
    repositionSection: (state, action: PayloadAction<IRepositionEntityPayload>) => {
      const { ownerEntityId: partId, oldIndex, newIndex } = action.payload;

      const part = state.parts[partId];
      if (!part.sectionIds) return;

      const [sectionIdToMove] = part.sectionIds.splice(oldIndex, 1);
      part.sectionIds.splice(newIndex, 0, sectionIdToMove);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getParts.fulfilled, (state, action) => {
        action.payload.parts.forEach(part => {
          // add to hash
          state.parts[part.id] = part;
        })
      })
      .addCase(getPart.fulfilled, (state, action) => {
        const fetchedPart = action.payload.part;

        state.parts[fetchedPart.id] = fetchedPart;
      })
      .addCase(createPart.fulfilled, (state, action) => {
        const { part } = action.payload;

        state.parts[part.id] = part;
      })
      .addCase(updatePart.fulfilled, (state, action) => {
        const { partId, name } = action.payload;

        state.parts[partId].name = name;
      })
      .addCase(updatePartChecklist.fulfilled, (state, action) => {
        const { partId, key, value } = action.payload;

        state.parts[partId].checklist[key] = value;
      })
      .addCase(deletePart.fulfilled, (state, action) => {
        const { part } = action.payload;

        state.parts = omit(state.parts, [part.id]);
      })
      // Sections
      .addCase(createSection.fulfilled, (state, action) => {
        const { partId, section } = action.payload;

        const part = state.parts[partId];
        if (!part) return;
        if (!part.sectionIds) part.sectionIds = [];

        part.sectionIds.push(section.id);
      })
      .addCase(getSections.fulfilled, (state, action) => {
        const { partId, sections } = action.payload;

        const sectionIds = sections.map(s => s.id);

        state.parts[partId].sectionIds = sectionIds;
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        const { partId, sectionId } = action.payload;

        const part = state.parts[partId];
        if (part === undefined) return;

        if (!part.sectionIds) return;

        part.sectionIds = part.sectionIds.filter(id => id !== sectionId);
      })
      // Concept Parts
      .addCase(getConceptParts.fulfilled, (state, action) => {
        const { partId, conceptParts } = action.payload;

        const part = state.parts[partId];
        if (!part) return;

        part.conceptIds = conceptParts.map(conceptPart => conceptPart.concept_id);
      })
      .addCase(createConceptPart.fulfilled, (state, action) => {
        const { part, conceptId } = action.payload;

        const partToUpdate = state.parts[part.id];
        if (!partToUpdate.conceptIds) partToUpdate.conceptIds = [];

        partToUpdate.conceptIds.push(conceptId);
      })
      .addCase(deleteConceptPart.fulfilled, (state, action) => {
        const { conceptId, part } = action.payload;

        const partToUpdate = state.parts[part.id];
        if (!partToUpdate.conceptIds) return;

        partToUpdate.conceptIds = partToUpdate.conceptIds.filter(id => id !== conceptId);
      })
  }
});

export const partReducer = partSlice.reducer;
export const {
  setCurrentPartId,
  repositionSection,
} = partSlice.actions;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createPart, deletePart, getPart, getParts, updatePart, updatePartChecklist } from "./part.thunks";
import omit from "lodash/omit";

import { IPartState } from "./part.types";
import { createNote, deleteNote, getNotes } from "note/redux/note.thunks";
import { IRepositionEntityPayload } from "../../shared/types.shared";
import { createConceptPart, deleteConceptPart, getConceptParts } from "../../concept-link/redux/concept-link.thunks";
import { createFact, deleteFact, getFacts } from "fact/redux/fact.thunks";

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
    repositionNote: (state, action: PayloadAction<IRepositionEntityPayload>) => {
      const { ownerEntityId: partId, oldIndex, newIndex } = action.payload;

      const part = state.parts[partId];
      if (!part.noteIds) return;

      const [noteIdToMove] = part.noteIds.splice(oldIndex, 1);
      part.noteIds.splice(newIndex, 0, noteIdToMove);
    },
    repositionFact: (state, action: PayloadAction<IRepositionEntityPayload>) => {
      const { ownerEntityId: partId, oldIndex, newIndex } = action.payload;

      const part = state.parts[partId];
      if (!part.factIds) return;

      const [factIdToMove] = part.factIds.splice(oldIndex, 1);
      part.factIds.splice(newIndex, 0, factIdToMove);
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
      
      /* Notes */
      .addCase(createNote.fulfilled, (state, action) => {
        const { partId, note } = action.payload;

        const part = state.parts[partId];
        if (!part) return;
        if (!part.noteIds) part.noteIds = [];

        part.noteIds.push(note.id);
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        const { partId, notes } = action.payload;

        const noteIds = notes.map(s => s.id);

        state.parts[partId].noteIds = noteIds;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        const { partId, noteId } = action.payload;

        const part = state.parts[partId];
        if (part === undefined) return;

        if (!part.noteIds) return;

        part.noteIds = part.noteIds.filter(id => id !== noteId);
      })

      /* Facts */
      .addCase(createFact.fulfilled, (state, action) => {
        const { partId, fact } = action.payload;

        const part = state.parts[partId];
        if (!part) return;
        if (!part.factIds) part.factIds = [];

        part.factIds.push(fact.id);
      })
      .addCase(getFacts.fulfilled, (state, action) => {
        const { partId, facts } = action.payload;

        const factIds = facts.map(fact => fact.id);

        state.parts[partId].factIds = factIds;
      })
      .addCase(deleteFact.fulfilled, (state, action) => {
        const { partId, factId } = action.payload;

        const part = state.parts[partId];
        if (part === undefined) return;

        if (!part.factIds) return;

        part.factIds = part.factIds.filter(id => id !== factId);
      })
      
      /* Concept Parts */
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
  repositionFact,
  repositionNote,
} = partSlice.actions;
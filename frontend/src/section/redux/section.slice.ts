import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSection, deleteSection, getSection, getSections, updateSection, updateSectionChecklist } from "./section.thunks";
import omit from "lodash/omit";

import { ISectionState } from "./section.types";
import { createNote, deleteNote, getNotes } from "note/redux/note.thunks";
import { IRepositionEntityPayload } from "../../shared/types.shared";
import { createConceptSection, deleteConceptSection, getConceptSections } from "../../concept-link/redux/concept-link.thunks";
import { createFact, deleteFact, getFacts } from "fact/redux/fact.thunks";

const initialState: ISectionState  = {
  sections: {},
  currentSectionId: undefined,
};

const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    setCurrentSectionId: (state, action: PayloadAction<string>) => {
      state.currentSectionId = action.payload;
    },
    repositionNote: (state, action: PayloadAction<IRepositionEntityPayload>) => {
      const { ownerEntityId: sectionId, oldIndex, newIndex } = action.payload;

      const section = state.sections[sectionId];
      if (!section.noteIds) return;

      const [noteIdToMove] = section.noteIds.splice(oldIndex, 1);
      section.noteIds.splice(newIndex, 0, noteIdToMove);
    },
    repositionFact: (state, action: PayloadAction<IRepositionEntityPayload>) => {
      const { ownerEntityId: sectionId, oldIndex, newIndex } = action.payload;

      const section = state.sections[sectionId];
      if (!section.factIds) return;

      const [factIdToMove] = section.factIds.splice(oldIndex, 1);
      section.factIds.splice(newIndex, 0, factIdToMove);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSections.fulfilled, (state, action) => {
        action.payload.sections.forEach(section => {
          // add to hash
          state.sections[section.id] = section;
        })
      })
      .addCase(getSection.fulfilled, (state, action) => {
        const fetchedSection = action.payload.section;

        state.sections[fetchedSection.id] = fetchedSection;
      })
      .addCase(createSection.fulfilled, (state, action) => {
        const { section } = action.payload;

        state.sections[section.id] = section;
      })
      .addCase(updateSection.fulfilled, (state, action) => {
        const { sectionId, name } = action.payload;

        state.sections[sectionId].name = name;
      })
      .addCase(updateSectionChecklist.fulfilled, (state, action) => {
        const { sectionId, key, value } = action.payload;

        state.sections[sectionId].checklist[key] = value;
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        const { section } = action.payload;

        state.sections = omit(state.sections, [section.id]);
      })
      
      /* Notes */
      .addCase(createNote.fulfilled, (state, action) => {
        const { sectionId, note } = action.payload;

        const section = state.sections[sectionId];
        if (!section) return;
        if (!section.noteIds) section.noteIds = [];

        section.noteIds.push(note.id);
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        const { sectionId, notes } = action.payload;

        const noteIds = notes.map(s => s.id);

        state.sections[sectionId].noteIds = noteIds;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        const { sectionId, noteId } = action.payload;

        const section = state.sections[sectionId];
        if (section === undefined) return;

        if (!section.noteIds) return;

        section.noteIds = section.noteIds.filter(id => id !== noteId);
      })

      /* Facts */
      .addCase(createFact.fulfilled, (state, action) => {
        const { sectionId, fact } = action.payload;

        const section = state.sections[sectionId];
        if (!section) return;
        if (!section.factIds) section.factIds = [];

        section.factIds.push(fact.id);
      })
      .addCase(getFacts.fulfilled, (state, action) => {
        const { sectionId, facts } = action.payload;

        const factIds = facts.map(fact => fact.id);

        state.sections[sectionId].factIds = factIds;
      })
      .addCase(deleteFact.fulfilled, (state, action) => {
        const { sectionId, factId } = action.payload;

        const section = state.sections[sectionId];
        if (section === undefined) return;

        if (!section.factIds) return;

        section.factIds = section.factIds.filter(id => id !== factId);
      })
      
      /* Concept Sections */
      .addCase(getConceptSections.fulfilled, (state, action) => {
        const { sectionId, conceptSections } = action.payload;

        const section = state.sections[sectionId];
        if (!section) return;

        section.conceptIds = conceptSections.map(conceptSection => conceptSection.concept_id);
      })
      .addCase(createConceptSection.fulfilled, (state, action) => {
        const { section, conceptId } = action.payload;

        const sectionToUpdate = state.sections[section.id];
        if (!sectionToUpdate.conceptIds) sectionToUpdate.conceptIds = [];

        sectionToUpdate.conceptIds.push(conceptId);
      })
      .addCase(deleteConceptSection.fulfilled, (state, action) => {
        const { conceptId, section } = action.payload;

        const sectionToUpdate = state.sections[section.id];
        if (!sectionToUpdate.conceptIds) return;

        sectionToUpdate.conceptIds = sectionToUpdate.conceptIds.filter(id => id !== conceptId);
      })
  }
});

export const sectionReducer = sectionSlice.reducer;
export const {
  setCurrentSectionId,
  repositionFact,
  repositionNote,
} = sectionSlice.actions;
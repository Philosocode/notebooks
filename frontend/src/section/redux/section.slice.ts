import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSection, deleteSection, getSection, getSections, updateSection, updateSectionChecklist } from "./section.thunks";
import omit from "lodash/omit";

import { ISectionState } from "./section.types";
import { createNote, deleteNote, getNotes } from "note/redux/note.thunks";
import { IRepositionEntityPayload } from "../../shared/types.shared";
import { createConceptSectionLink, deleteConceptSectionLink, getConceptSectionLinks } from "../../concept-link/redux/concept-link.thunks";
import { createFlashcard, deleteFlashcard, getFlashcards } from "flashcard/redux/flashcard.thunks";

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
    repositionFlashcard: (state, action: PayloadAction<IRepositionEntityPayload>) => {
      const { ownerEntityId: sectionId, oldIndex, newIndex } = action.payload;

      const section = state.sections[sectionId];
      if (!section.flashcardIds) return;

      const [flashcardIdToMove] = section.flashcardIds.splice(oldIndex, 1);
      section.flashcardIds.splice(newIndex, 0, flashcardIdToMove);
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

      /* Flashcards */
      .addCase(createFlashcard.fulfilled, (state, action) => {
        const { sectionId, flashcard } = action.payload;

        const section = state.sections[sectionId];
        if (!section) return;
        if (!section.flashcardIds) section.flashcardIds = [];

        section.flashcardIds.push(flashcard.id);
      })
      .addCase(getFlashcards.fulfilled, (state, action) => {
        const { sectionId, flashcards } = action.payload;

        const flashcardIds = flashcards.map(flashcard => flashcard.id);

        state.sections[sectionId].flashcardIds = flashcardIds;
      })
      .addCase(deleteFlashcard.fulfilled, (state, action) => {
        const { sectionId, flashcardId } = action.payload;

        const section = state.sections[sectionId];
        if (section === undefined) return;

        if (!section.flashcardIds) return;

        section.flashcardIds = section.flashcardIds.filter(id => id !== flashcardId);
      })
      
      /* Concept Sections */
      .addCase(getConceptSectionLinks.fulfilled, (state, action) => {
        const { sectionId, conceptSectionLinks } = action.payload;

        const section = state.sections[sectionId];
        if (!section) return;

        section.conceptIds = conceptSectionLinks.map(conceptSectionLink => conceptSectionLink.concept_id);
      })
      .addCase(createConceptSectionLink.fulfilled, (state, action) => {
        const { section, conceptId } = action.payload;

        const sectionToUpdate = state.sections[section.id];
        if (!sectionToUpdate.conceptIds) sectionToUpdate.conceptIds = [];

        sectionToUpdate.conceptIds.push(conceptId);
      })
      .addCase(deleteConceptSectionLink.fulfilled, (state, action) => {
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
  repositionFlashcard,
  repositionNote,
} = sectionSlice.actions;